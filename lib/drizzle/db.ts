import { neon, Pool } from "@neondatabase/serverless";
// import { drizzle } from "drizzle-orm/neon-http";
// import { drizzle } from "drizzle-orm/neon-serverless";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// const client = neon(process.env.DATABASE_URL!);
const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client, { schema, logger: false });

// const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
// export const db = drizzle(pool, { schema, logger: true });
