# confeta
Ultimate configuration library

```js
import { Confeta, types } from 'confeta'
import ConfetaEnv from 'confeta-argv'
import ConfetaArgv from 'confeta-env'
import ConfetaFile from 'confeta-file'

let config = Confeta({
  mongoUrl: {
    type: types.string,
    description: 'Mongo Url',
    default: 'mongo://localhost:27017'
  }
  timeout: {
    type: types.integer
  }
  host: {
    type: {  // nested object
      domain: {
        type: types.string,
        description: 'Domain name',
        required: true
      },
      port: {
        type: types.integer,
        description: 'Port',
        required: true
      },
    }
  },
})
.addSource(ConfetaEnv({prefix: 'MYAPP__'}))
.addSource(ConfetaArgv())
.addSource(ConfetaFile({parseFn: JSON.parse, path: 'config.json'}))
.build()
```
