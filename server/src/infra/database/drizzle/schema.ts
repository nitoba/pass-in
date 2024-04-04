import { randomUUID } from 'node:crypto'
import {
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const events = pgTable(
  'events',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => randomUUID()),
    title: text('title').notNull(),
    details: text('details'),
    slug: text('slug').notNull(),
    maximumAttendees: integer('maximum_attendees'),
  },
  ({ slug }) => ({
    slugIdx: uniqueIndex().on(slug),
  }),
)

export const checkIns = pgTable('check_ins', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  attendeeId: text('attendee_id')
    .notNull()
    .references(() => attendees.id, { onDelete: 'cascade' }),
  eventId: text('event_id')
    .notNull()
    .references(() => events.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at')
    .notNull()
    .$defaultFn(() => new Date()),
})

export const attendees = pgTable(
  'attendees',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => randomUUID()),
    name: text('name').notNull(),
    email: text('email').notNull(),
    eventId: text('event_id')
      .notNull()
      .references(() => events.id, { onDelete: 'cascade' }),
    checkInId: text('check_in_id'),
  },
  ({ email, eventId }) => ({
    emailIdx: uniqueIndex().on(email),
    eventIdEmailIdx: uniqueIndex().on(email, eventId),
  }),
)

export const attendeesRelations = relations(attendees, ({ one }) => ({
  event: one(events, {
    fields: [attendees.eventId],
    references: [events.id],
    relationName: 'events-attendees',
  }),
  checkIn: one(checkIns, {
    fields: [attendees.checkInId],
    references: [checkIns.id],
    relationName: 'attendees-check-ins',
  }),
}))

export const eventsRelations = relations(events, ({ many }) => ({
  attendees: many(attendees),
}))

export const checkInsRelations = relations(checkIns, ({ one }) => ({
  event: one(events, {
    fields: [checkIns.eventId],
    references: [events.id],
    relationName: 'events-check-ins',
  }),
  attendee: one(attendees, {
    fields: [checkIns.attendeeId],
    references: [attendees.id],
    relationName: 'attendees-check-ins',
  }),
}))
