import { MarketRecord } from '../../../domain/tracker/market/Record'
import { DataReceiver } from '../../../domain/tracker/process/DataReceiver'
import { FilePersister } from '../../../common/FilePersister'
import { FileRecord } from '../../../common/FileRecord'

export class FileProcessorJson implements DataReceiver {
  private persister: FilePersister

  constructor (persister: FilePersister) {
    this.persister = persister
  }

  public exec (records: MarketRecord[]): void {
    const fileRecords: any = []
    records.forEach((record: MarketRecord) => {
      fileRecords.push(new FileRecord(JSON.stringify(record)))
    })
    this.persister.store(fileRecords)
  }
}
