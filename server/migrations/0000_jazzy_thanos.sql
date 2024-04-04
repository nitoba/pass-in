CREATE TABLE IF NOT EXISTS "attendees" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"event_id" text NOT NULL,
	"check_in_id" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "check_ins" (
	"id" text PRIMARY KEY NOT NULL,
	"attendee_id" text NOT NULL,
	"event_id" text NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "events" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"details" text,
	"slug" text NOT NULL,
	"maximum_attendees" integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "attendees_email_index" ON "attendees" ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "attendees_email_event_id_index" ON "attendees" ("email","event_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "events_slug_index" ON "events" ("slug");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "attendees" ADD CONSTRAINT "attendees_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_attendee_id_attendees_id_fk" FOREIGN KEY ("attendee_id") REFERENCES "attendees"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
