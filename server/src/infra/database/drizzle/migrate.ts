import { env } from '@/infra/env/env'
import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { Client } from 'pg'

async function runMigrate() {
  const sql = new Client(env.DATABASE_URL)
  await sql.connect()
  const db = drizzle(sql)
  await migrate(db, {
    migrationsFolder: 'migrations',
  })
  await sql.end()
}

runMigrate().then(() => {
  console.log('Migrations completed')
})
