import { MarketRecord } from '../market/Record'
import { DataReceiver } from './DataReceiver'
import { FilePersister } from '../../../infrastructure/FilePersister'
import { FileRecord } from '../../../infrastructure/FileRecord'

export class FileProcessorCsv implements DataReceiver {
  private _persister: FilePersister

  constructor (persister: FilePersister) {
    this._persister = persister
  }

  public exec (records: MarketRecord[]): void {
    const fileRecords: any = []
    records.forEach((record: MarketRecord) => {
      const csvRow = []
      csvRow.push(record.time)
      csvRow.push(record.source)
      csvRow.push(record.observed.name)
      csvRow.push(record.buy)
      csvRow.push(record.sell)
      csvRow.push(record.currency.name)
      fileRecords.push(new FileRecord(csvRow.join(',')))
    })
    this._persister.store(fileRecords)
  }
}
