import minimist from 'minimist'

const $argv = Symbol('argv')

class ConfetaArgv {
  constructor (options = {}) {
    let argv = minimist(process.argv.slice(2))
    if (argv._ && options.optionlessArgName) {
      argv[options.optionlessArgName] = argv._[0]
      delete argv._
    }

    this[$argv] = argv
  }

  get (segments) {
    let value = this[$argv]

    for (const segment of segments) {
      value = value[segment]
      if (!value) {
        return
      }
    }

    return value
  }
}

export default function createInstance (options) {
  return new ConfetaArgv(options)
}

