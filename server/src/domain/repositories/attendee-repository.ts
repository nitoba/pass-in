import type { Attendee } from '../entities/attendee'

export type FindByEventIdAndEmailParams = {
  email: string
  eventId: string
}

export type FindManyByEventIdResponse = {
  attendees: Attendee[]
  total: number
}

export type FindManyByEventIdParams = {
  eventId: string
  query?: string
  page?: number
}

export interface AttendeeRepository {
  create(attendee: Attendee): Promise<void>
  findByEventIdAndEmail(
    params: FindByEventIdAndEmailParams,
  ): Promise<Attendee | null>
  findById(id: string): Promise<Attendee | null>
  findManyByEventId(
    params: FindManyByEventIdParams,
  ): Promise<FindManyByEventIdResponse>
}
