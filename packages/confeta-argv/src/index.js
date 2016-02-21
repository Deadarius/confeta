import minimist from 'minimist'

const $argv = Symbol('argv')
const $separator = Symbol('separator')

class ConfetaArgv {
  constructor (options = {}) {
    let argv = minimist(process.argv.slice(2))
    if (argv._ && options.optionlessArgName) {
      argv[options.optionlessArgName] = argv._
      delete argv._
    }

    this[$argv] = argv
    this[$separator] = options.separator || '.'
  }

  get (segments) {
    let value = this[$argv]

    for (const segment of segments) {
      value = value[segment]
    }

    return value
  }
}

export default function createInstance (options) {
  return new ConfetaArgv(options)
}

