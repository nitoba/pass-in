import type { Attendee } from '@/domain/entities/attendee'
import type {
  AttendeeRepository,
  FindByEventIdAndEmailParams,
  FindManyByEventIdParams,
  FindManyByEventIdResponse,
} from '@/domain/repositories/attendee-repository'

export class InMemoryAttendeeRepository implements AttendeeRepository {
  attendees: Attendee[] = []

  async create(attendee: Attendee): Promise<void> {
    this.attendees.push(attendee)
  }

  async findByEventIdAndEmail(
    params: FindByEventIdAndEmailParams,
  ): Promise<Attendee | null> {
    const attendee = this.attendees.find(
      (attendee) =>
        attendee.email === params.email &&
        attendee.attendeeOn.toString() === params.eventId,
    )
    return attendee || null
  }

  async findById(id: string): Promise<Attendee | null> {
    const attendee = this.attendees.find(
      (attendee) => attendee.id.toString() === id,
    )
    return attendee || null
  }

  async findManyByEventId({
    eventId,
    page = 1,
    query,
  }: FindManyByEventIdParams): Promise<FindManyByEventIdResponse> {
    const offset = (page - 1) * 10

    if (query) {
      const attendees = this.attendees.filter(
        (attendee) =>
          (attendee.email.includes(query) || attendee.name.includes(query)) &&
          attendee.id.toString() === eventId,
      )
      return {
        attendees: attendees.slice(offset, offset + 10),
        total: attendees.length,
      }
    }

    const attendees = this.attendees.filter(
      (attendee) => attendee.attendeeOn.toString() === eventId,
    )

    return {
      attendees: attendees.slice(offset, offset + 10),
      total: attendees.length,
    }
  }
}
