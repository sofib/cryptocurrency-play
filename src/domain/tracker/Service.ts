import { DataReceiver } from './process/DataReceiver'
import { ExchangeRates } from './process/ExchangeRates'

export async function processSource (exchangeRates: ExchangeRates, processor: DataReceiver) {
  const rates = await exchangeRates.get()
  return processor.exec(rates)
}

export async function loadSource (exchangeRates: ExchangeRates) {
  return exchangeRates.get()
}
