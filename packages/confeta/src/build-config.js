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

function throwIfStrict (options) {
  if (options.strict) {
    throw new Error('Incorrect type')
  }
}

function processPrimitiveType (raw, type, options) {
  let value = raw

  switch (type) {
    case types.string: {
      if (typeof raw !== 'string') {
        throwIfStrict(options)

        value = `${raw}`
      }

      break
    }
    case types.boolean: {
      if (typeof raw !== 'boolean') {
        throwIfStrict(options)

        value = raw === 'true'
      }
      break
    }
    case types.integer: {
      if (typeof raw !== 'number') {
        throwIfStrict(options)

        value = parseInt(raw, 10)

        if (isNaN(value)) {
          throw new Error('Couldn\'t parse integer')
        }
      }
      break
    }
    case types.float: {
      if (typeof setting !== 'number') {
        throwIfStrict(options)

        value = parseFloat(raw)
      }

      if (isNaN(value)) {
        throw new Error('Couldn\'t parse float')
      }
      break
    }
    case types.date: {
      if (!(raw instanceof Date)) {
        throwIfStrict(options)

        value = new Date(raw)
      }

      if (value.toString() === 'Invalid Date') {
        throw new Error('Couldn\'t parse date')
      }
      break
    }
    case types.array: {
      if (!(raw instanceof Array)) {
        throwIfStrict(options)

        value = raw
      }

      break
    }
    case types.arrayOf: {
      if (!(raw instanceof Array)) {
        throwIfStrict(options)

        value = [raw]
      }

      break
    }

    default: {
      throw new Error('')
    }
  }

  return value
}

function buildConfig (schema, getValue, options) {
  let result = {}

  traverseSchema(schema, (descriptor, segments) => {
    let raw = getValue(segments, descriptor)
    let value = raw

    if (descriptor.type instanceof Array) {
      if (!(raw instanceof Array)) {
        throwIfStrict(options)

        value = [raw]
      }

      let underlyingType = descriptor.type[0]

      value = value.map(x => processPrimitiveType(x, underlyingType, options))
    } else {
      value = processPrimitiveType(value, descriptor.type, options)
    }
    assignValue(result, segments, value)
  })

  return result
}

export default buildConfig
