import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",

  datasource: {
    url: process.env.DATABASE_URL!,
  },

  migrations: {
    path: "prisma/migrations",
    seed: "bun run src/seeder/categories.seed.ts",
  },
});