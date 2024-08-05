CREATE TABLE IF NOT EXISTS "noti_subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"value" json NOT NULL
);
