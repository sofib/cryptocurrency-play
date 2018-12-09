import { Ticker } from './process/Ticker'
import { ExchangeRates } from './process/ExchangeRates'
import { DataReceiver } from './process/DataReceiver'
import { MarketRecord } from './market/Record'
import { ExchangeRates as Blockchain } from './source/blockchain/ExchangeRates'
import { ExchangeRates as Flatfile } from './source/flatfiles/ExchangeRates'

import { FileProcessorCsv } from './process/FileProcessorCsv'
import { FilePersister } from '../../infrastructure/FilePersister'
import { FileReader } from '../../infrastructure/FileReader'
import * as fs from 'fs'

export class CryptoCurrencyTrackerConfig {
  public source: CryptoCurrencyTrackerSource
  public dataReceiver: DataReceiver
}

export class CryptoCurrencyTrackerSourceFileConfig extends CryptoCurrencyTrackerConfig {
  public sourceFilename: string
}

export class CryptoCurrencyTrackerReceiverFileConfig extends CryptoCurrencyTrackerConfig {
  public receiverFilename: string
}
export enum CryptoCurrencyTrackerSource {
  Blockchain = 1,
  Flatfile = 2,
}

const sourceMap: any[] = []
sourceMap[CryptoCurrencyTrackerSource.Blockchain] = Blockchain
sourceMap[CryptoCurrencyTrackerSource.Flatfile] = Flatfile

export class CryptoCurrencyTracker {
  private exchangeRates: ExchangeRates
  private dataReceiver: DataReceiver

  constructor(rate: ExchangeRates, dataReceiver: DataReceiver) {
    this.exchangeRates = rate
    this.dataReceiver = dataReceiver
  }

  public async getRates(): Promise<MarketRecord[]> {
    return this.exchangeRates.get()
  }

  public async fetchRates(): Promise<MarketRecord[]> {
    const rates = await this.exchangeRates.get()
    this.dataReceiver.exec(rates)

    return rates
  }

  public static create(config: CryptoCurrencyTrackerConfig): CryptoCurrencyTracker {
    if (!config.source || !config.dataReceiver) {
      return null
    }

    let rate
    switch (config.source) {
      case CryptoCurrencyTrackerSource.Flatfile:
        const flatFileConfig = config as CryptoCurrencyTrackerSourceFileConfig
        console.error('flat file configured', flatFileConfig.sourceFilename)
        rate = new sourceMap[config.source](flatFileConfig.sourceFilename)
        break
      default:
        console.error('default exec')

        rate = new sourceMap[config.source]()
    }

    return new CryptoCurrencyTracker(rate, config.dataReceiver)
  }

  public static createCsvFileReceiver(filename: string): DataReceiver {
    return new FileProcessorCsv(
      new FilePersister(filename)
    )
  }
}
