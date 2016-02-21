const $env = Symbol('env')
const $separator = Symbol('separator')

class ConfetaEnv {
  constructor (options = {}) {
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

    return this[$env][path]
  }
}

export default function createInstance (options) {
  return new ConfetaEnv(options)
}

