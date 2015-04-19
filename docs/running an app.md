running an app
==============

When you use `salamandra init`, it creates a basic `app.js` for you,
that looks something like this:

```js
var salamandra = require("salamandra")
var app = salamandra.express()

// Require routes here..
//require("./pages/<page>/route")(app)

app.listen(salamandra.config.PORT, function(  ){
  console.log("app listening (%s)", salamandra.config.env)
  console.log("config", salamandra.config)
})
```

Now you can run it like this:

```
node app
```

By default, salamandra is running in `production` mode.
You can switch environments with a cli argument:

```
node app dev
```


it's really straight forward to run a salamandra app,
and it doesn't require you to write special logic.

All salamandra does is provide some helper functions
that work on a pre-defined directory and file structure.

From there, it's up to you to run the app and extend up on it.
