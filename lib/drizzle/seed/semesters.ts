import dotenv from "dotenv";
import { Majors, SemesterTerms, Years } from "@/lib/constant/constants";
import { semesters } from "../schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { drizzle as postgresDrizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../schema";

dotenv.config({
  path: [".env.local", ".env"],
});

const isMini = false;
const miniMajors = ["IT", "MC"];
const miniYears = ["2"];
const miniTerms = ["Second"];

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
  const majors = isMini ? miniMajors : Majors;
  const years = isMini ? miniYears : Years;
  const terms = isMini ? miniTerms : SemesterTerms;

  for (const major of majors) {
    for (const year of years) {
      for (const term of terms) {
        const combination = { major, year, term, calendar_id: "" };
        uniqueCombinations.push(combination);
      }
    }
  }
  await db.insert(semesters).values(uniqueCombinations);
  console.log("done");
}

seed();
