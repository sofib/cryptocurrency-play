export class Currency {
  private _name: string
  private _symbol: string
  private _crypto: boolean

  constructor (name: string, symbol: string, crypto: boolean) {
    this._name = name
    this._symbol = symbol
    this._crypto = crypto
  }

  get name (): string {
    return this._name
  }

  get symbol (): string {
    return this._symbol
  }

  get crypto (): boolean {
    return this._crypto
  }
}
