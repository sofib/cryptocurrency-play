import { Container } from '../../../../src/common/ioc/Container'
import { expect } from 'chai'
import 'mocha'

describe('Container', () => {
  it('should provide class dependency', () => {
    Container.instance().bindToFactory(MyType, myTypeFactory)
    expect(Container.instance().provide(MyType)).to.be.instanceOf(MyType)
      .with.property('sampleProperty', 'new')
  })

  it('should not provide invalid class dependency', () => {
    Container.instance().bindToFactory(MyType, myTypeFactory)
    expect(Container.instance().provide(MyType)).not.to.be.instanceOf(MyOtherType)
  })
})

class MyType {
  get sampleProperty (): string { return 'new' }
}

class MyOtherType {}

const myTypeFactory = function (): MyType {
  return new MyType()
}
