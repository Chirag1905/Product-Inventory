import prisma from "../prismaClient";

async function main() {
    const categories = ["Electronics", "Clothing", "Books", "Furniture"];

    await prisma.category.createMany({
        data: categories.map((name) => ({ name })),
        skipDuplicates: true
    });

    console.log("✅ Categories seeded successfully");
}

main()
    .catch((e) => {
        console.error("❌ Seeding failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });