import tape from 'tape'
import { Confeta, types } from '../index'
// import traverseSchema from '../src/traverse-schema'

let mockSource = {
  get (segments) {
    if (segments[segments.length - 1].startsWith('arrayOfString')) {
      let array = []
      for (let i = 0; i < 10; i++) {
        let newVal = Math.random() * 100 + 13
        array.push('' + newVal)
      }
      return array
    }

    if (segments[segments.length - 1].startsWith('arrayOfInteger')) {
      let array = []
      for (let i = 0; i < 10; i++) {
        let newVal = Math.floor(Math.random() * 100 + 13)
        array.push(newVal)
      }
      return array
    }

    if (segments[segments.length - 1].startsWith('array')) {
      let array = []
      for (let i = 0; i < 10; i++) {
        let newVal = Math.random() * 100 + 13
        if (newVal > 60) {
          newVal = '' + newVal
        }
        array.push(newVal)
      }
      return array
    }

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
  },
  array: {
    type: types.array
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

  test.ok(config.array, 'array is present')
  test.ok(config.array instanceof Array, 'array is indeed an array')
  test.ok(config.array.length > 0, 'array has members')

  test.end()
})
