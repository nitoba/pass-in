import type { Event } from '@/domain/entities/event'
import type { EventRepository } from '@/domain/repositories/event-repository'

export class InMemoryEventRepository implements EventRepository {
  events: Event[] = []

  async create(event: Event): Promise<void> {
    this.events.push(event)
  }

  async findBySlug(slug: string): Promise<Event | null> {
    const event = this.events.find((event) => event.slug === slug)
    return event || null
  }

  async findById(id: string): Promise<Event | null> {
    const event = this.events.find((event) => event.id.toString() === id)
    return event || null
  }

  async findMany(): Promise<Event[]> {
    return this.events
  }
}
