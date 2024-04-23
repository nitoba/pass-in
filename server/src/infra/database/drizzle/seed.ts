import { Client } from 'pg'
import { attendees, events } from './schema'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from './schema'
import { env } from '@/infra/env/env'
import { faker } from '@faker-js/faker'
async function seed() {
  const eventId = '6460150a-126a-485d-861e-339563065134'
  const client = new Client({
    connectionString: env.DATABASE_URL,
  })

  await client.connect()
  const db = drizzle(client, { schema })
  await db.insert(events).values({
    id: eventId,
    title: 'Event 1',
    slug: 'event-1',
    maximumAttendees: 100,
  })

  for (let i = 0; i < 100; i++) {
    await db.insert(attendees).values({
      email: faker.internet.email(),
      eventId,
      name: faker.person.fullName(),
    })
  }

  await db.insert(attendees).values([
    {
      email: 'jose@doe.com',
      eventId,
      name: 'Jose',
    },
    {
      email: 'janedoe@doe.com',
      eventId,
      name: 'Jane',
    },
  ])
  await client.end()
}

seed().then(() => {
  console.log('Seeding finished')
})
