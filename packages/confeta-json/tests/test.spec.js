import tape from 'tape'
import ConfetaJson from '../lib/index'

tape('Test parse', test => {
  let confetaJson = ConfetaJson({path: 'tests/fixture.json'})

  test.equal(confetaJson.get(['arg1']), 'argone')
  test.equal(confetaJson.get(['arg2']), 'argtwo')
  test.equal(confetaJson.get(['nested', 'arg1']), 'nestedargone')
  test.equal(confetaJson.get(['nested', 'arg2']), 'nestedargtwo')
  test.equal(confetaJson.get(['nested', 'subnested', 'arg3']), 'argthree')

  test.end()
})

