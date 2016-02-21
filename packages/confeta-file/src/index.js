import fs from 'fs'
import path from 'path'

const $obj = Symbol('obj')

class ConfetaFile {
  constructor (options = {parseFn: JSON.parse}) {
    let obj
    if (options.content) {
      obj = options.parseFn(options.content)
    } else if (options.path) {
      let filePath = options.path

      !path.isAbsolute(filePath) && (filePath = path.resolve(process.cwd(), options.path))

      obj = options.parseFn(fs.readFileSync(filePath, 'utf8'))
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
  return new ConfetaFile(options)
}

