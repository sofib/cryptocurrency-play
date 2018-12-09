import * as commander from 'commander'
import { CryptoCurrencyTracker, CryptoCurrencyTrackerSource } from '../../domain/tracker/CryptoCurrencyTracker'
export class Runner {
  static exec (params: any): void {
    commander
      .version('0.1.0', '-v, --version')
      .option('-bc, --blockchain', 'Get the BTC data from blockchain')
      .parse(params)

    // setup btc blockchain as the default, it is the only one atm
    const currencyFetcher = CryptoCurrencyTracker.create({
      source: CryptoCurrencyTrackerSource.Blockchain,
      dataReceiver: CryptoCurrencyTracker.createCsvFileReceiver('./test.csv')
    })

    currencyFetcher.fetchRates()
      .then(() => {
        console.log('complete')
      })
      .catch((err: Error) => {
        console.log('Failed', err)
      })
  }

}

// commander
//   .version('0.1.0', '-v, --version')
//   .option('-bc, --blockchain', 'Get the BTC data from blockchain')
//   .parse(process.argv)
