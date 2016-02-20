import tape from 'tape'
import { Confeta, types } from '../index'
import traverseSchema from '../src/traverse-schema'

let mockSource = {
  get (segments) {
    return '' + Math.random()
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

tape('Test0', test => {
  traverseSchema(schema, (descriptor, segments) => {
    console.log(segments.join('.'))
  })

  test.end()
})

tape('Test', test => {
  let config = Confeta({
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
  })
  .addSource(mockSource)
  .build()

  test.ok(config, 'Config is built')
  console.log(config)
  test.end()
})
