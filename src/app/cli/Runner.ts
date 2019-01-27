import * as commander from 'commander'
import { CryptoCurrencyTracker } from '../../infrastructure/tracker/CryptoCurrencyTracker'
import { Container } from '../../common/ioc/Container'
import { ExchangeRatesFactoryPlaceholder } from '../../domain/tracker/process/ExchangeRates'
import { processSource } from '../../domain/tracker/Service'
import { DataReceiverFactoryPlaceholder } from '../../domain/tracker/process/DataReceiver'

export class Runner {
  static exec (params: any): void {
    commander
      .version('0.1.0', '-v, --version')
      .option('-bc, --blockchain', 'Get the BTC data from blockchain')
      .parse(params)

    // setup btc blockchain as the default, it is the only one atm
    Container.instance().bindToFactory(
      ExchangeRatesFactoryPlaceholder,
      CryptoCurrencyTracker.createBlockchainFetcher())

    Container.instance().bindToFactory(
      DataReceiverFactoryPlaceholder,
      CryptoCurrencyTracker.createCsvFileReceiver('./test.csv'))

    processSource(
      Container.instance().provide(ExchangeRatesFactoryPlaceholder),
      Container.instance().provide(DataReceiverFactoryPlaceholder)
    )
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
