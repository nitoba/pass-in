import type { Attendee } from '@/domain/entities/attendee'

export class AttendeePresenter {
  static toHttp(attendee: Attendee) {
    return {
      id: attendee.id.toString(),
      name: attendee.name,
      email: attendee.email,
    }
  }
}
