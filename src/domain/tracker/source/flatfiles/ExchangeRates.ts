import { MarketRecord } from '../../market/Record'
import { MarketRecordBuilder } from '../MarketRecordBuilder'
import { ExchangeRates as Rates } from '../../process/ExchangeRates'
import { Ticker } from '../../process/Ticker'
import { FileReader } from '../../../../infrastructure/FileReader'
import { FileRecord } from '../../../../infrastructure/FileRecord'
import * as fs from 'fs'

export class ExchangeRates implements Rates, Ticker {
  private reader: FileReader = null
  private fileName: string

  constructor(filename: string) {
    this.fileName = filename
  }

  private async getReader(filename: string): Promise<FileReader> {
    return new Promise<FileReader>((resolve, reject) => {
      fs.open(filename, 'r', (err: NodeJS.ErrnoException, fd: number) => {
        if (err) return reject(err)
        resolve(new FileReader(fd))
      })
    })
  }

  public async get(): Promise<MarketRecord[]> {
    if (this.reader === null) {
      this.reader = await this.getReader(this.fileName)
    }
    const marketRecords: MarketRecord[] = []
    let row: FileRecord[]
    while (row = await this.reader.read()) {
      row.forEach((record: FileRecord): void => {
        const parsed = record.value.split(',')
        const builder = new MarketRecordBuilder()
        marketRecords.push(
          builder.setSource(parsed[1])
            .setBuy(parseFloat(parsed[3]))
            .setSell(parseFloat(parsed[4]))
            .setCurrencyObserved(builder.currency.fromString(parsed[2]))
            .setCurrencyTarget(builder.currency.fromString(parsed[5]))
            .setTime(parseInt(parsed[0]))
            .build()
        )
      })
    }

    return marketRecords
  }
  
  public async ticker(): Promise<MarketRecord[]> {
    return this.get()
  }
}
