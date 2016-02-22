import types from './types'
import traverseSchema from './traverse-schema'

function assignValue (result, segments, value) {
  const firstSegment = segments[0]

  if (segments.length === 1) {
    result[firstSegment] = value
    return
  }

  let nextResult = result[firstSegment]
  if (!nextResult) {
    nextResult = result[firstSegment] = {}
  }

  assignValue(nextResult, segments.slice(1), value)
}

function buildConfig (schema, getValue, options) {
  function throwIfStrict () {
    if (options.strict) {
      throw new Error('Incorrect type')
    }
  }

  let result = {}

  traverseSchema(schema, (descriptor, segments) => {
    let raw = getValue(segments, descriptor)
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
            throw new Error('Couldn\'t parse integer')
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
          throw new Error('Couldn\'t parse float')
        }
        break
      }
      case types.date: {
        if (!(raw instanceof Date)) {
          throwIfStrict()

          value = new Date(raw)
        }

        if (value.toString() === 'Invalid Date') {
          throw new Error('Couldn\'t parse date')
        }
        break
      }

      default: {
        throw new Error('')
      }
    }

    assignValue(result, segments, value)
  })

  return result
}

export default buildConfig
