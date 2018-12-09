import { MarketRecord } from '../market/Record'
import { DataReceiver } from './DataReceiver'
import { FilePersister } from '../../../infrastructure/FilePersister'
import { FileRecord } from '../../../infrastructure/FileRecord'

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
