import buildConfig from './build-config'

const $sources = Symbol('sources')
const $schema = Symbol('schema')
const $options = Symbol('options')

class Confeta {
  constructor (schema, options = {}) {
    this[$schema] = schema
    this[$sources] = []
    this[$options] = options
  }

  addSource (instance, mapKey = x => x) {
    this[$sources].push({
      instance,
      mapKey
    })

    return this
  }

  build () {
    return buildConfig(this[$schema], (segments, descriptor) => {
      for (let source of this[$sources]) {
        const {
          instance,
          mapKey
        } = source

        let mappedSegments = segments.map(mapKey)

        let value = instance.get(mappedSegments)

        if (value) {
          return value
        }
      }

      if (descriptor.default) {
        return descriptor.default
      }

      if (descriptor.required) {
        throw new Error(`Required value ${segments} was not found in any source`)
      }
    }, this[$options])
  }
}

export default function (...args) {
  return new Confeta(...args)
}
