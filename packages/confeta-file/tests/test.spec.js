import tape from 'tape'
import yaml from 'yaml'

import ConfetaFile from '../lib/index'

tape('Parse function', test => {
  test.plan(1)
  ConfetaFile(content => {
    test.equal(content, 'TEXTBLAHBLAH\n')
    return {}
  }, {path: 'tests/fixture.txt'})
})

tape('Parse JSON', test => {
  let confetaFile = ConfetaFile({parseFn: JSON.parse, path: 'tests/fixture.json'})

  test.equal(confetaFile.get(['arg1']), 'argone')
  test.equal(confetaFile.get(['arg2']), 'argtwo')
  test.equal(confetaFile.get(['nested', 'arg1']), 'nestedargone')
  test.equal(confetaFile.get(['nested', 'arg2']), 'nestedargtwo')
  test.equal(confetaFile.get(['nested', 'subnested', 'arg3']), 'argthree')

  test.end()
})

tape('Parse YAML', test => {
  let confetaFile = ConfetaFile({parseFn: yaml.eval, path: 'tests/fixture.yaml'})

  test.equal(confetaFile.get(['arg1']), 'argone')
  test.equal(confetaFile.get(['arg2']), 'argtwo')
  test.equal(confetaFile.get(['nested', 'arg1']), 'nestedargone')
  test.equal(confetaFile.get(['nested', 'arg2']), 'nestedargtwo')
  test.equal(confetaFile.get(['nested', 'subnested', 'arg3']), 'argthree')

  test.end()
})
