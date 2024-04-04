CREATE TABLE IF NOT EXISTS "events" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"details" text,
	"slug" text NOT NULL,
	"maximum_attendees" integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "events_slug_index" ON "events" ("slug");