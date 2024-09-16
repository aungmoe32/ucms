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
  const sems = await db.query.semesters.findMany({});
  console.log(sems);
  await Promise.all([
    ...sems.map((sem) => {
      return db.insert(schema.subjects).values({
        name: ".",
        color: "#2C80FF",
        semesterId: sem.id,
        code: "0",
      });
    }),
  ]);
  console.log("done");
}

seed();
