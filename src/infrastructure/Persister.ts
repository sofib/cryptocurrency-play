export interface Persister<T> {
  store (records: T[]): void
}
