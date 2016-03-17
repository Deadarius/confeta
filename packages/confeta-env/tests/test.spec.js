import tape from 'tape'
import ConfetaEnv from '../lib/index'

process.env = {
  'ARG1': 'ignored',
  'PRE__ARG1': 'arg1',
  'PRE__ARG2': 'arg2',
  'PRE__NESTED__ARG_ONE': 'argone',
  'PRE__NESTED__ARG_TWO': 'argtwo',
  'PRE__NESTED__SUBNESTED__ARG_THREE': 'argthree',
  'ARRAY': 'one,two,three'
}

tape('Test parse', test => {
  let confetaEnv = ConfetaEnv({prefix: 'PRE__', separator: '__'})

  test.equal(confetaEnv.get(['ARG1']), 'arg1')
  test.equal(confetaEnv.get(['ARG2']), 'arg2')
  test.equal(confetaEnv.get(['NESTED', 'ARG_ONE']), 'argone')
  test.equal(confetaEnv.get(['NESTED', 'ARG_TWO']), 'argtwo')
  test.equal(confetaEnv.get(['NESTED', 'SUBNESTED', 'ARG_THREE']), 'argthree')

  test.end()
})

tape('Test array', test => {
  let confetaEnvWithArrays = ConfetaEnv({arraySeparator: ','})

  test.deepEqual(confetaEnvWithArrays.get(['ARRAY']), ['one', 'two', 'three'])
  test.equal(confetaEnvWithArrays.get(['ARG1']), 'ignored')

  let confetaEnvWithoutArrays = ConfetaEnv()

  test.equal(confetaEnvWithoutArrays.get(['ARRAY']), 'one,two,three')

  test.end()
})

