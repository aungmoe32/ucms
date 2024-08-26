import dotenv from "dotenv";
import { Majors, SemesterTerms, Years } from "@/lib/constants";
import { semesters } from "../schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { drizzle as postgresDrizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../schema";

dotenv.config({
  path: [".env.local", ".env"],
});

const isNeon = false;
let db: any = null;
if (isNeon) {
  const client = neon(process.env.DATABASE_URL!);
  db = drizzle(client, { schema, logger: true });
} else {
  const client = postgres(process.env.DATABASE_URL!);
  db = postgresDrizzle(client, { schema, logger: true });
}

async function seed() {
  const uniqueCombinations = [];

  for (const major of Majors) {
    for (const year of Years) {
      for (const term of SemesterTerms) {
        const combination = { major, year, term };
        uniqueCombinations.push(combination);
      }
    }
  }
  await db.insert(semesters).values(uniqueCombinations);
  console.log("done");
}

seed();
