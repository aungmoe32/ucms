import dotenv from "dotenv";
import { Majors, SemesterTerms, Years } from "@/lib/constant/constants";
import { semesters } from "../schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { drizzle as postgresDrizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../schema";
import { eq } from "drizzle-orm";

dotenv.config({
  path: [".env.local", ".env"],
});

const isNeon = false;
let db: any = null;
const eventTypes = [
  {
    name: "Tutorial",
    color: "#ff30ac",
  },
  {
    name: "Class",
    color: "#30b3ff",
  },
  {
    name: "Lab",
    color: "#ffb730",
  },
];

if (isNeon) {
  const client = neon(process.env.DATABASE_URL!);
  db = drizzle(client, { schema, logger: true });
} else {
  const client = postgres(process.env.DATABASE_URL!);
  db = postgresDrizzle(client, { schema, logger: true });
}

async function seed() {
  await db.insert(schema.eventTypes).values(eventTypes);
  console.log("done");
}

seed();
