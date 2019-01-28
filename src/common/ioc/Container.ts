import { inspect } from 'util'

let container: Container = null

type Class = { new(...args: any[]): any }

export class Container {
  private singletons: Map<any, any> = new Map()
  private factories: Map<any, any> = new Map()

  public static instance (): Container {
    if (!container) {
      container = new Container()
    }

    return container
  }

  public bindToFactory<T> (type: any, factory: ProviderFactory<T>): void {
    console.error('binging for type', inspect(type))
    this.factories.set(type, factory)
  }

  public provide<Type, Instance> (type: Type): Instance {
    console.error('providing for type', inspect(type))
    const singleton = this.provideSingle(type)
    if (singleton) {
      return singleton as Instance
    }

    return this.factories.get(type)()
  }

  private provideSingle<Type, Instance> (type: Type): Instance {
    const singleton = this.singletons.get(type)
    if (!singleton) {
      return null
    }

    return singleton
  }
}

export interface ProviderFactory<T> {
  (): T
}
