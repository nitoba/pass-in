export interface Server {
  listen(port: number): void
  close(): Promise<void>
}
