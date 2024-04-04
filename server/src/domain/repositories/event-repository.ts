import type { Event } from '../entities/event'

export interface EventRepository {
  create(event: Event): Promise<void>
  findBySlug(slug: string): Promise<Event | null>
  findById(id: string): Promise<Event | null>
  findMany(): Promise<Event[]>
}
