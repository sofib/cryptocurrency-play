import { Persister } from './Persister'
import { FileRecord } from './FileRecord'
import * as fs from 'fs'

export class FilePersister implements Persister<FileRecord> {
  private _filename: string

  constructor (filename: string) {
    this._filename = filename
  }

  store (records: FileRecord[]): void {
    fs.appendFileSync(this._filename, records.map((record: FileRecord) => record.value).join('\n') + '\n')

    console.log(records)
  }
}
