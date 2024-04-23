import type { CheckIn } from '@/domain/entities/check-in'
import type { CheckInRepository } from '@/domain/repositories/check-in-repository'

export class InMemoryCheckInRepository implements CheckInRepository {
  checkIns: CheckIn[] = []
  async create(checkIn: CheckIn): Promise<void> {
    this.checkIns.push(checkIn)
  }

  async findByAttendeeIdAndEventId(
    attendeeId: string,
    eventId: string,
  ): Promise<CheckIn | null> {
    const checkIn = this.checkIns.find(
      (checkIn) =>
        checkIn.attendee.id.toString() === attendeeId &&
        checkIn.event.id.toString() === eventId,
    )
    return checkIn || null
  }
}
