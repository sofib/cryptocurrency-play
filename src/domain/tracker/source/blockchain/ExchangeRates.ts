import { MarketRecord } from '../../market/Record'
import { ExchangeRates as Rates } from '../../process/ExchangeRates'
import { BlockchainRecord } from './BlockchainRecord'
import { EurCurrency } from '../../market/currency/Eur'
import { UsdCurrency } from '../../market/currency/Usd'

import * as needle from 'needle'

const API_ENDPOINT = 'https://blockchain.info/ticker'
const TIMEOUT_MILISECONDS = '5000'

export class ExchangeRates implements Rates {
  public get (): Promise<MarketRecord[]> {
    return new Promise<MarketRecord[]>((resolve, reject) => {
      needle.get(API_ENDPOINT, { parse_response: false }, (err: Error, response: any) => {
        if (err) {
          reject(err)
        }

        const json = JSON.parse(response.body)
        resolve([
          new BlockchainRecord(json.EUR.buy, json.EUR.sell, new EurCurrency()),
          new BlockchainRecord(json.USD.buy, json.USD.sell, new UsdCurrency())
        ])
      })
    })
  }
}
