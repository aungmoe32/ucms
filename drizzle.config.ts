import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({
  path: [".env.local", ".env"],
});

export default defineConfig({
  schema: "./lib/drizzle/schema.ts",
  out: "./lib/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
