
export class Container {
  private singletons: Map<any, any> = new Map()
  private factories: Map<any, any> = new Map()

  public registerSingleton<Type, Provider> (type: Type, instance: Provider): void {
    this.singletons.set(type, instance)
  }

  public registerProviderFactory<Type, ProviderFactory> (type: Type, factory: ProviderFactory): void {
    this.factories.set(type, factory)
  }

  public provideSingleton<Type, Instance> (type: Type): Instance {
    const singleton = this.singletons.get(type)
    if (!singleton) {
      return null
    }

    return singleton
  }

  public provide<Type, Instance> (type: Type): Instance {
    const singleton = this.provideSingleton(type)
    if (singleton) {
      return singleton as Instance
    }

    return this.factories.get(type).create()
  }
}
