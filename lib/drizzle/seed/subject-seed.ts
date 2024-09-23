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
const targetSemId = "6e781f99-c72a-4fdc-bdc5-0b99a40630b3";
const subjectList = [
  {
    name: "Eng",
    code: "2334",
    color: "#25f768",
  },
  {
    name: "Math",
    code: "2334",
    color: "#2C80FF",
  },
  {
    name: "C++",
    code: "2334",
    color: "#5900ff",
  },
  {
    name: "Web",
    code: "2334",
    color: "#eb28a3",
  },
  {
    name: "BEE",
    code: "2334",
    color: "#30fff8",
  },
  {
    name: "DLD",
    code: "2334",
    color: "#ffdd30",
  },
  {
    name: "DCOM",
    code: "2334",
    color: "#ff6130",
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
