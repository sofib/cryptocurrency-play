export class FileRecord {
  private _buffer: string
  constructor (buffer: string = '') {
    this._buffer = buffer
  }

  public append (characters: string): void {
    this._buffer += characters
  }

  get value (): string {
    return this._buffer
  }
}
