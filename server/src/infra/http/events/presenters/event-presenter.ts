import type { Event } from '@/domain/entities/event'

export class EventPresenter {
  static toHttp(event: Event) {
    return {
      id: event.id.toString(),
      title: event.title,
      details: event.details,
      maximumAttendees: event.maximumAttendees,
      slug: event.slug,
      amountOfAttendees: event.amountOfAttendees,
    }
  }
}
