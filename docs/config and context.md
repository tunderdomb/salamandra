config and context
==================

## Related files

    app/
      config/
        development.js
        global.js
        production.js
        test.js
      context/
        development.js
        global.js
        production.js
        test.js

## From code

```js
salamandra.getConfig()
salamandra.config
salamandra.getContext()
salamandra.context
```

### functions: `salamandra.getConfig(forceEnv, fresh)` and `salamandra.getContext(forceEnv, fresh)`

Returns the merged values of `app/config/*` mentioned above.

The files used for merge depends on the `NODE_ENV` value.
You can overwrite this by providing `forceEnv`.

Setting `fresh` to `true` will clear the require cache before requiring config files
to provide with up to date values.

### properties: `salamandra.config` and `salamandra.context`

Is a shortcut that contains the result of a `salamandra.getConfig()` call.

## Merge order

  1. global.js
  2. development.js | productions.js | test.js

## Added values:

salamandra sets some shorthand values on this object:

 - `salamandra.config.env` is a string, either `"development"`, `"production"`, or `"test"`
 - `salamandra.config.dev` is a boolean
 - `salamandra.config.development` is a boolean
 - `salamandra.config.prod` is a boolean
 - `salamandra.config.production` is a boolean
 - `salamandra.config.test` is a boolean

Also, if you take a look at the productions config template,
the port is already defined as `process.env.PORT` for you.
