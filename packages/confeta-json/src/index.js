import fs from 'fs'
import path from 'path'


const $obj = Symbol('obj')

class ConfetaJson {
  constructor (options = {}) {
    let obj
    if (options.content) {
      obj = JSON.parse(options.content)
    } else if (options.path) {
      let filePath = options.path

      !path.isAbsolute(filePath) && (filePath = path.resolve(process.cwd(), options.path))
      obj = JSON.parse(fs.readFileSync(filePath))
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

export default function createInstance (options) {
  return new ConfetaJson(options)
}

