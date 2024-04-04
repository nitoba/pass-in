import { api } from '../lib/api'
import { AttendeeFromEvent } from '../types/attendee'

const currentEventId = '6460150a-126a-485d-861e-339563065134'

type GetAttendeesFromEventParams = {
  page?: number
  query?: string
}

export async function getAttendeesFromEvent({
  page,
  query,
}: GetAttendeesFromEventParams) {
  try {
    const res = await api.get<AttendeeFromEvent>(
      `/events/${currentEventId}/attendees`,
      {
        params: {
          page,
          query,
        },
      },
    )
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
