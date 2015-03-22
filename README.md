salamandra
==========

Do you like web apps? Do you like *writing* web apps?
Ever thought that project scaffolding could be less painful and straightforward?

Use salamandra to quickly make a project, easily create pages and serve the app with express.

## Install

```
npm install salamandra --save
```

## Init project

```
salamandra init
```

This will scaffold a project structure in the current directory.

## Create pages

```
salamandra page <name>
```

This will scaffold a page to `pages/<name>` containing the following files:

 - `context.json` Rendering context for this page.
 - `index.dust` The default template to render.
 - `route.js` The route handler that renders this page.

## Usage

### Serve the app

in `/app.js` :

```js
var salamandra = require("salamandra")
var app = salamandra.express()

require("./pages/home/route")(app)

app.listen(salamandra.config.PORT, function(  ){
  console.log("app listening (%s)", salamandra.config.env)
  console.log("config", salamandra.config)
})
```

### Page rendering

```js
app.get("/", salamandra.render("home"))
```

`.render(<page>)` returns a middleware function you can plug into a router.

`.render("home")` will try to render `pages/home/index.dust` using `pages/home/context.json`.

`.render("home/sub")` will try to render `pages/home/sub.dust` using `pages/home/sub/context.json`.

### Contexts

The rendering context of a template is merged from the global context, the static context local to the template,
and the inline context passed to the render function, in this order.

This means that values with the same key overwrite each other in this order.

#### Global

`app/context/*.js` contains global context files. These are used as baseline for rendering page templates.
Each file corresponds to their respective environment.
Use the global context to provide default values that are relevant everywhere in your project.

#### Local

`pages/<page>/context.json`

Use the local context to provide data that is relevant to a specific page.

#### Inline

```js
salamandra.render("<page>", {
  // inline context ...
})
```

Use inline context to provide dynamic values specific at runtime.

#### Dynamic

```js
var renderPage = salamandra.render("<page>")
app.get("/", function(req, res, next){
  // set a context property on the request, this will be the dynamic context for the template
  req.context = {
    user: User.find(req.params.id)
  }
  renderPage.call(this, req, res, next)
})
```

Use dynamic context to provide dynamic values specific to the request, e.g. coming from a database.

### Environments

Runtime environments and contexts are governed by the value of the `NODE_ENV` environment variable.

### Config

Following the same logic as contexts, `app/config/*js` are config files corresponding with env values.

`salamandra.config` contains the export of the currently relevant config file.

salamandra sets some shorthand values on this object:

 - `salamandra.config.env` is a string, either `"development"`, `"production"`, or `"test"`
 - `salamandra.config.dev` is a boolean
 - `salamandra.config.development` is a boolean
 - `salamandra.config.prod` is a boolean
 - `salamandra.config.production` is a boolean
 - `salamandra.config.test` is a boolean

## Licence

MIT
