import type { Config } from 'drizzle-kit'

export default {
  schema: './src/infra/database/drizzle/schema.ts',
  out: './migrations',
  driver: 'pg', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config
