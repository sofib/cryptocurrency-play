import {
  DataReceiver, DataReceiverFactory,
} from '../../domain/tracker/process/DataReceiver'
import { CryptoCurrencyTracker as Tracker } from '../../domain/tracker/CryptoCurrencyTracker'
import { FileProcessorCsv } from './process/FileProcessorCsv'
import { FilePersister } from '../../common/disk/FilePersister'
import { ExchangeRates as Flatfile } from './source/flatfiles/ExchangeRates'
import { ExchangeRates as Blockchain } from './source/blockchain/ExchangeRates'
import { ExchangeRatesFactory } from '../../domain/tracker/process/ExchangeRates'

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

  public static create (config: CryptoCurrencyTrackerConfig): Tracker {
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

    return new Tracker(rate, config.dataReceiver)
  }

  /**
   * @returns Tracker
   */
  static createCsvReader () {
    const config: CryptoCurrencyTrackerSourceFileConfig = {
      source: CryptoCurrencyTrackerSource.Flatfile,
      sourceFilename: './test.csv',
      dataReceiver: CryptoCurrencyTracker.createCsvFileReceiver('./test.csv')(),
    }

    return CryptoCurrencyTracker.create(config)
  }

  public static createCsvFileReceiver (filename: string): DataReceiverFactory {
    return () => new FileProcessorCsv(new FilePersister(filename))
  }

  public static createBlockchainFetcher (): ExchangeRatesFactory {
    return () => new Blockchain()
  }

  public static createFlatfileFetcher (filename: string): ExchangeRatesFactory {
    return () => new Flatfile(filename)
  }
}
