import fs from 'fs'
import path from 'path'

const $obj = Symbol('obj')
const $hasNoFile = Symbol('has-no-file')

class ConfetaFile {
  constructor (options = {}) {
    this[$hasNoFile] = false

    let parseFn = options.parseFn || JSON.parse
    let obj
    if (options.content) {
      obj = parseFn(options.content)
    } else if (options.path) {
      let filePath = options.path

      !path.isAbsolute(filePath) && (filePath = path.resolve(process.cwd(), options.path))
      if (!fs.existsSync(filePath)) {
        this[$hasNoFile] = true
        this[$obj] = {}
      }

      obj = parseFn(fs.readFileSync(filePath, 'utf8'))
    }

    this[$obj] = obj
  }

  get (segments) {
    if (this[$hasNoFile]) {
      return
    }

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

export default function createInstance (options) {
  return new ConfetaFile(options)
}

