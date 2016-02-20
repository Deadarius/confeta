import types from './types'
import traverseSchema from './traverse-schema'

function buildConfig (schema, getValue, options) {
  function throwIfStrict () {
    if (options.strict) {
      throw new Error('')
    }
  }

  let result = {}

  traverseSchema(schema, (descriptor, segments) => {
    let raw = getValue(segments)
    let value = raw

    switch (descriptor.type) {
      case types.string: {
        if (typeof raw !== 'string') {
          throwIfStrict()

          value = `${raw}`
        }
        break
      }
      case types.boolean: {
        if (typeof raw !== 'boolean') {
          throwIfStrict()

          value = raw === 'true'
        }
        break
      }
      case types.integer: {
        if (typeof raw !== 'number') {
          throwIfStrict()

          value = parseInt(raw, 10)

          if (isNaN(value)) {
            throw new Error()
          }
        }
        break
      }
      case types.float: {
        if (typeof setting !== 'number') {
          throwIfStrict()

          value = parseFloat(raw)
        }

        if (isNaN(value)) {
          throw new Error()
        }
        break
      }
      case types.date: {
        if (!(raw instanceof Date)) {
          throwIfStrict()

          value = new Date(raw)
        }

        if (value.toString() === 'Invalid Date') {
          throw new Error()
        }
        break
      }

      default: {
        throw new Error('')
      }
    }

    let key = segments.join('.')

    result[key] = value
  })

  return result
}

export default buildConfig
