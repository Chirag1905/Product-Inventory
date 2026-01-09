import { z } from "zod";

export const CreateProductSchema = z.object({
    name: z
        .string()
        .min(1, "Product name is required"),

    description: z
        .string()
        .min(1, "Description is required"),

    quantity: z
        .number()
        .int()
        .min(1, "Quantity must be at least 1"),

    categoryIds: z
        .array(z.number().int())
        .min(1, "At least one category is required"),
});
