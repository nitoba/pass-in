CREATE UNIQUE INDEX IF NOT EXISTS "attendees_email_event_id_index" ON "attendees" ("email","event_id");