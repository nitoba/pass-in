CREATE TABLE IF NOT EXISTS "attendees" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"events_id" text
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "attendees_email_index" ON "attendees" ("email");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "attendees" ADD CONSTRAINT "attendees_events_id_events_id_fk" FOREIGN KEY ("events_id") REFERENCES "events"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
