# Confeta
### Delicious configuration library

![](https://raw.githubusercontent.com/Deadarius/confeta/master/images/confeta-large.png)

# Usage:

```js
import { Confeta, types } from 'confeta'
import ConfetaEnv from 'confeta-env'
import ConfetaArgv from 'confeta-argv'
import ConfetaFile from 'confeta-file'
import changeCase from 'change-case'

let config = Confeta({
  mongoUrl: {
    type: types.string,
    description: 'Mongo Url',
    default: 'mongo://localhost:27017'
  },
  timeout: {
    type: types.integer
  },
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
      }
    }
  }
})
.addSource(ConfetaEnv({prefix: 'MYAPP__', separator: '__'}), changeCase.constantCase)
.addSource(ConfetaArgv())
.addSource(ConfetaFile({parseFn: JSON.parse, path: 'config.json'}))
.build()
```

Full example can be seen in ```./example```

# Why? We already have nconf...

I got tired of nconf inability to handle different naming conventions between different sources (e.g. CONSTANT_CASE in process.env vs camelCase in json file). So I created a new, more customisable library where you can specify schema for your configuration and map schema names to different sources. With schema you can specify exactly what type do you expect and avoid annoying situation when you have to parse value manually after getting it from config. Also some simple validation I think is nice.

# Separate packages?

Yes, core ```confeta``` package has no sources in it. You have to either install a separate package with source you need for your app or implement your own one (which is very simple btw)

Officially supported sources:
* confeta-env 
* confeta-args
* confeta-file (Customisable to read from any format you want, given you provide parse function, reads JSON by default)

# Api

## Confeta(schema, options)

options:
* strict - (boolean) when true throw errors if types from config source don't match specified in config, when false just tries to parse them (default: false) 

## .addSource(source, mapKeyFn)

* source - object that used to fetch settings from specific source
* mapKeyFn - function that is used to map schema key to source key (e.g. if you want to turn pascalCase name of schema into CONSTANT_CASE name from environment)

## .build()

Returns object containting all settings fetched from sources

# Custom sources

It's very simple, all you have to do is provide object which exposes ```.get(segments)``` function. It will be called every time Confeta tries to fetch value and ```segments``` will be an array of strings which represents a path to value in a schema tree.

# License

MIT
