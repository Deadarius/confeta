import tape from 'tape'
import ConfetaArgv from '../lib/index'

process.argv = process
  .argv
  .slice(0, 2)
  .concat([
    '-a', 'a_value',
    '-b', 'b_value',
    '--arg1', 'arg1value',
    '--arg2=arg2value',
    '--nested.arg1', 'nested_arg1value',
    '--nested.arg2=nested_arg2value',
    '--nested.subnested.arg1=nested_subnested_arg2value',

    'noOptionValue'
  ])

tape('Test parse', test => {
  let confetaArgv = ConfetaArgv()

  test.equal(confetaArgv.get(['a']), 'a_value')
  test.equal(confetaArgv.get(['b']), 'b_value')
  test.equal(confetaArgv.get(['nested', 'arg1']), 'nested_arg1value')
  test.equal(confetaArgv.get(['nested', 'arg2']), 'nested_arg2value')
  test.equal(confetaArgv.get(['nested', 'subnested', 'arg1']), 'nested_subnested_arg2value')

  test.end()
})

