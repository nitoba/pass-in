import { defineConfig } from 'tsup'

export default defineConfig({
  name: 'tsup',
  target: 'es2022',
  entry: ['./src/', '!src/infra/database/drizzle/migrations/**'],
  format: 'esm',
})
