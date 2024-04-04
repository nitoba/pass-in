import { db } from '../db'
import { attendees, events } from '../schema'
import { count, eq } from 'drizzle-orm'
import type { EventRepository } from '@/domain/repositories/event-repository'
import type { Event } from '@/domain/entities/event'
import { DrizzleEventMapper } from '../mappers/event-mapper'

export class DrizzleEventRepository implements EventRepository {
  async findById(id: string): Promise<Event | null> {
    const [eventOnDb] = await db
      .select({
        count: count(attendees.eventId),
        id: events.id,
        title: events.title,
        details: events.details,
        maximumAttendees: events.maximumAttendees,
        slug: events.slug,
      })
      .from(events)
      .groupBy(events.id)
      .leftJoin(attendees, eq(events.id, attendees.eventId))
      .where(eq(events.id, id))

    if (!eventOnDb) {
      return null
    }

    return DrizzleEventMapper.toDomain(eventOnDb, eventOnDb.count)
  }

  async findBySlug(slug: string) {
    const [eventOnDb] = await db
      .select({
        count: count(attendees.eventId),
        id: events.id,
        title: events.title,
        details: events.details,
        maximumAttendees: events.maximumAttendees,
        slug: events.slug,
      })
      .from(events)
      .groupBy(events.id)
      .leftJoin(attendees, eq(events.id, attendees.eventId))
      .where(eq(events.slug, slug))

    if (!eventOnDb) {
      return null
    }

    return DrizzleEventMapper.toDomain(eventOnDb, eventOnDb.count)
  }

  async findMany(): Promise<Event[]> {
    const storageEvents = await db.select().from(events)
    return storageEvents.map(DrizzleEventMapper.toDomain)
  }

  async create(event: Event) {
    await db.insert(events).values({
      id: event.id.toString(),
      title: event.title,
      details: event.details,
      maximumAttendees: event.maximumAttendees,
      slug: event.slug,
    })
  }
}
