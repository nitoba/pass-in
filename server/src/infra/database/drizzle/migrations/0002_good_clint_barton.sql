ALTER TABLE "attendees" RENAME COLUMN "events_id" TO "event_id";--> statement-breakpoint
ALTER TABLE "attendees" DROP CONSTRAINT "attendees_events_id_events_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "attendees" ADD CONSTRAINT "attendees_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
