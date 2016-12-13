import fs from 'fs'
import path from 'path'

import ConfetaText from 'confeta-text'

class ConfetaFile extends ConfetaText {
  constructor (filePath, options = {}) {
    if (!path.isAbsolute(filePath)) {
      filePath = path.resolve(process.cwd(), filePath)
    }

    if (!fs.existsSync(filePath)) {
      return super('{}')
    }

    const text = fs.readFileSync(filePath, 'utf8')

    super(text, {parseFn: options.parseFn})
  }
}

export default function createInstance (...args) {
  return new ConfetaFile(...args)
}

