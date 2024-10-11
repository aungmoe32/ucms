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
const targetSemId = "53768a0b-5094-4bd3-ba3b-c3952c711a4e";
const subjectList = [
  {
    name: "Eng",
    code: "E-22011",
    color: "#ffd0a1",
  },
  {
    name: "Math",
    code: "EM-22008",
    color: "#9efc9d",
  },
  {
    name: "C++",
    code: "IT-22015",
    color: "#ccfcb3",
  },
  {
    name: "Web",
    code: "IT-22025",
    color: "#fa9491",
  },
  {
    name: "BEE",
    code: "IT-22011",
    color: "#ffd0a1",
  },
  {
    name: "DLD",
    code: "IT-22021",
    color: "#faaade",
  },
  {
    name: "DCOM",
    code: "IT-22012",
    color: "#73ffd3",
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
  subjectList.map((subject) => {
    subject.semesterId = targetSemId;
  });

  await db.insert(schema.subjects).values(subjectList);
  console.log("done");
}

seed();
