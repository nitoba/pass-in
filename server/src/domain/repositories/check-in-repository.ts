import type { CheckIn } from '../entities/check-in'

export interface CheckInRepository {
  create(checkIn: CheckIn): Promise<void>
  findByAttendeeIdAndEventId(
    attendeeId: string,
    eventId: string,
  ): Promise<CheckIn | null>
}
