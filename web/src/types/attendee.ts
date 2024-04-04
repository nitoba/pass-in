export interface Attendee {
  id: string
  name: string
  email: string
  checkedInAt: string | null
}

export interface AttendeeFromEvent {
  attendees: Attendee[]
  total: number
}
