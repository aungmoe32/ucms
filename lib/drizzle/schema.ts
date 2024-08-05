import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  uuid,
  json,
} from "drizzle-orm/pg-core";

export const noti_subscriptions = pgTable("noti_subscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  value: json("value").notNull(),
});
