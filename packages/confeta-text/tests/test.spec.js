import tape from 'tape'
import fs from 'fs'
import path from 'path'
import yaml from 'yaml'

import ConfetaText from '../lib/index'

const jsonText = fs.readFileSync(path.resolve(__dirname, './fixture.json'), 'utf8')
const yamlText = fs.readFileSync(path.resolve(__dirname, './fixture.yaml'), 'utf8')

tape('Parse JSON by default', test => {
  let confetaText = ConfetaText(jsonText)

  test.equal(confetaText.get(['arg1']), 'argone')
  test.equal(confetaText.get(['arg2']), 'argtwo')
  test.equal(confetaText.get(['nested', 'arg1']), 'nestedargone')
  test.equal(confetaText.get(['nested', 'arg2']), 'nestedargtwo')
  test.equal(confetaText.get(['nested', 'subnested', 'arg3']), 'argthree')

  test.end()
})

tape('Parse YAML', test => {
  let confetaText = ConfetaText(yamlText, {parseFn: yaml.eval})

  test.equal(confetaText.get(['arg1']), 'argone')
  test.equal(confetaText.get(['arg2']), 'argtwo')
  test.equal(confetaText.get(['nested', 'arg1']), 'nestedargone')
  test.equal(confetaText.get(['nested', 'arg2']), 'nestedargtwo')
  test.equal(confetaText.get(['nested', 'subnested', 'arg3']), 'argthree')

  test.end()
})
