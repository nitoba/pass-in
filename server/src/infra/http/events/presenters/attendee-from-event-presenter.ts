import type { Attendee } from '@/domain/entities/attendee'

export class AttendeeFromEventPresenter {
  static toHttp(attendee: Attendee) {
    return {
      id: attendee.id.toString(),
      name: attendee.name,
      email: attendee.email,
      attendeeOn: attendee.attendeeOn?.toString(),
      checkInAt: attendee.checkInAt ?? null,
    }
  }
}
