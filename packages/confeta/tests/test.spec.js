import tape from 'tape'
import { Confeta, types } from '../index'
// import traverseSchema from '../src/traverse-schema'

let mockSource = {
  get (segments) {
    return '' + Math.random() * 100 + 13
  }
}

let schema = {
  mongoUrl: {
    type: types.string,
    description: 'Mongo Url',
    required: true,
    default: 'mongo://localhost:27017'
  },
  auth: {
    type: {
      userName: {
        type: types.string,
        description: 'User Name',
        default: 'guest'
      },
      password: {
        type: types.string,
        description: 'Password'
      }
    }
  },
  timeout: {
    type: types.integer
  }
}

tape('Create instance', test => {
  let confeta = Confeta()
  test.ok(confeta, 'Instance is created')
  test.end()
})

// tape('Test0', test => {
//   traverseSchema(schema, (descriptor, segments) => {
//     console.log(segments.join('.'))
//   })

//   test.end()
// })

tape('Test', test => {
  let config = Confeta(schema)
  .addSource(mockSource)
  .build()

  test.ok(config, 'Config is built')
  test.equal(typeof config, 'object', 'config is an object')

  test.ok(config.mongoUrl, 'mongoUrl is present')
  test.equal(typeof config.mongoUrl, 'string', 'mongoUrl is a string')

  test.ok(config.auth, 'auth is present')
  test.equal(typeof config.auth, 'object', 'auth is an object')

  test.ok(config.auth.userName, 'auth.userName is present')
  test.equal(typeof config.auth.userName, 'string', 'auth.userName is a string')

  test.ok(config.auth.password, 'auth.password is present')
  test.equal(typeof config.auth.password, 'string', 'auth.password is a string')

  test.ok(config.timeout, 'timeout is present')
  test.equal(typeof config.timeout, 'number', 'timeout is a number')
  test.equal(config.timeout, parseInt(config.timeout), 'timeout is an integer')

  test.end()
})
