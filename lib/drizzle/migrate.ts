import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
dotenv.config({
  path: [".env.local", ".env"],
});
const migrationClient = postgres(process.env.DATABASE_URL!, { max: 1 });

async function main() {
  await migrate(drizzle(migrationClient), {
    migrationsFolder: "./lib/drizzle/migrations",
  });

  await migrationClient.end();
}
main();
