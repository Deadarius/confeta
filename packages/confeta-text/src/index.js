const $obj = Symbol('obj')

class ConfetaText {
  constructor (text, options = {}) {
    let parseFn = options.parseFn || JSON.parse

    this[$obj] = parseFn(text)
  }

  get (segments) {
    let value = this[$obj]

    for (const segment of segments) {
      value = value[segment]

      if (!value) {
        return
      }
    }

    return value
  }
}

export default function createInstance (...args) {
  return new ConfetaText(...args)
}

