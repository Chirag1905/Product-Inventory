import prisma from "../prismaClient";
import { CreateProductSchema } from "../validations/product.schema";
import { apiError } from "./errors";

export const resolvers = {
    Query: {
        categories: async () => {
            const categories = await prisma.category.findMany({
                orderBy: { name: "asc" }
            });

            return {
                success: true,
                message: "Categories fetched successfully",
                categories
            };
        },

        products: async (_: any, args: any) => {
            const {
                search,
                categoryIds,
                page = 1,
                limit = 5
            } = args;

            const skip = (page - 1) * limit;

            const where: any = {};

            if (search) {
                where.name = {
                    contains: search,
                    mode: "insensitive"
                };
            }

            if (categoryIds?.length) {
                where.categories = {
                    some: {
                        categoryId: { in: categoryIds }
                    }
                };
            }

            const [products, total] = await prisma.$transaction([
                prisma.product.findMany({
                    where,
                    skip,
                    take: limit,
                    orderBy: { createdAt: "desc" },
                    include: {
                        categories: {
                            include: { category: true }
                        }
                    }
                }),
                prisma.product.count({ where })
            ]);

            return {
                success: true,
                message: "Products fetched successfully",
                products,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit)
                }
            };
        }
    },

    Product: {
        categories: (p: any) =>
            p.categories.map((pc: any) => pc.category)
    },

    Mutation: {
        createProduct: async (_: any, args: any) => {
            const parsed = CreateProductSchema.safeParse(args);

            if (!parsed.success) {
                const fieldErrors: Record<string, string[]> = {};

                parsed.error.issues.forEach((issue) => {
                    const field = issue.path[0] as string;

                    if (!fieldErrors[field]) {
                        fieldErrors[field] = [];
                    }

                    fieldErrors[field].push(issue.message);
                });

                apiError("Validation failed", "BAD_USER_INPUT", fieldErrors);
            }

            const exists = await prisma.product.findUnique({
                where: { name: args.name },
            });

            if (exists) {
                apiError(
                    "Validation failed",
                    "BAD_USER_INPUT",
                    { name: ["Product name already exists"] }
                );
            }

            await prisma.$transaction(async (tx) => {
                const product = await tx.product.create({
                    data: {
                        name: args.name,
                        description: args.description,
                        quantity: args.quantity,
                    },
                });

                await tx.productCategory.createMany({
                    data: args.categoryIds.map((cid: number) => ({
                        productId: product.id,
                        categoryId: cid,
                    })),
                });
            });

            return {
                success: true,
                message: "Product created successfully",
            };
        },

        deleteProduct: async (_: any, { id }: { id: number }) => {
            const exists = await prisma.product.findUnique({ where: { id } });

            if (!exists) {
                apiError("Product not found", "NOT_FOUND");
            }

            await prisma.product.delete({ where: { id } });

            return {
                success: true,
                message: "Product deleted successfully"
            };
        }
    }
};