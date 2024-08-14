import dotenv from "dotenv";
import { drizzle as postgresDrizzle } from "drizzle-orm/postgres-js";
import { migrate as postgresMigrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { neon } from "@neondatabase/serverless";
import postgres from "postgres";
dotenv.config({
  path: [".env.local", ".env"],
});

const isNeon = true; // neon or postgres js

async function main() {
  if (isNeon) {
    const migrationClient = neon(process.env.DATABASE_URL!);
    await migrate(drizzle(migrationClient), {
      migrationsFolder: "./lib/drizzle/migrations",
    });
  } else {
    const migrationClient = postgres(process.env.DATABASE_URL!, { max: 1 });
    await postgresMigrate(postgresDrizzle(migrationClient), {
      migrationsFolder: "./lib/drizzle/migrations",
    });
    await migrationClient.end(); // for use with postgresjs
  }

  // console.log(data);
}
main();
