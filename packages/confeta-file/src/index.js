import fs from 'fs'
import path from 'path'

const $obj = Symbol('obj')

class ConfetaFile {
  constructor (parseFn, options = {}) {
    let obj
    if (options.content) {
      obj = parseFn(options.content)
    } else if (options.path) {
      let filePath = options.path

      !path.isAbsolute(filePath) && (filePath = path.resolve(process.cwd(), options.path))

      obj = parseFn(fs.readFileSync(filePath, 'utf8'))
    }

    this[$obj] = obj
  }

  get (segments) {
    let value = this[$obj]

    for (const segment of segments) {
      value = value[segment]
    }

    return value
  }
}

export default function createInstance (parseFn, options) {
  return new ConfetaFile(parseFn, options)
}

