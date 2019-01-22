import { MarketRecord } from '../market/Record'

export class Peek {
  private records: MarketRecord[]

  constructor (records: MarketRecord[]) {
    this.records = records
  }

  public async latest () {
    return this.records.sort((a, b: MarketRecord): number => a.time > b.time ? 1 : -1)
  }

  public async weekly () {
    const week = []
    for (let i = 1; i <= 7; i++) {
      week.push({
        weekday: i,
        count: this.getWeekdays(i).length
      })
    }

    return week
  }

  public async matrix () {
    return this.records.map((record: MarketRecord) => {
      const date = new Date(record.time)
      return {
        hours: date.getHours(),
        weekday: date.getDay(),
        month: date.getMonth(),
        currency: record.currency,
        observed: record.observed,
      }
    })
  }

  private getWeekdays (day: number) {
    return this.records.filter((value: MarketRecord, index: number) => {
      const date = new Date(value.time)
      return date.getDay() === day
    })
  }
}
