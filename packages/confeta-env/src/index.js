const $env = Symbol('env')
const $separator = Symbol('separator')
const $options = Symbol('options')

class ConfetaEnv {
  constructor (options = {}) {
    this[$options] = options
    let prefix = options.prefix || ''
    this[$separator] = options.separator || '.'
    this[$env] = Object.keys(process.env)
      .filter(x => x.startsWith(prefix))
      .reduce((sum, key) => {
        const keyWithoutPrefix = key.slice(prefix.length, key.length)
        sum[keyWithoutPrefix] = process.env[key]

        return sum
      }, {})
  }

  get (segments) {
    let path = segments.join(this[$separator])

    let value = this[$env][path]
    const arraySeparator = this[$options].arraySeparator

    if (value && arraySeparator && value.indexOf(arraySeparator) > -1) {
      value = value.split(arraySeparator)
    }

    return value
  }
}

export default function createInstance (options) {
  return new ConfetaEnv(options)
}

