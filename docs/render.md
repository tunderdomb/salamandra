render
======

## Related files

    pages/
      <page>
        client.js
        context.json
        index.dust
        index.styl
        route.js

## From code

```js
salamandra.render()
```

### `salamandra.render(page, inlineContext)`

Returns a middleware that handles page rendering.

```js
return function( req, res, next ){ /*...*/}
```

If `inlineContext` is provided, it will be used for creating rendering context later.

### Rendering contexts

Pages rendered with `salamandra.render()` use a number of sources to create context.

#### global context

This is the the current `salamandra.config` object.
In development, it's always fresh.
In production it is required once.

**Purpose:** Store values that are relevant in every corner of your app.

#### inline context

This is the object you provided to `salamandra.render(page, inlineContext)`.

**Purpose:** Values relevant when you define a route.

Use it like this:

```js
app.get("/", salamandra.render("<page>", {
  // stuff..
}))
```

#### page context

The contents of `pages/<page>/context.json`.

**Purpose:** Values relevant to this page specifically, like the title.

#### dynamic context

The custom `req.context` object you set before rendering.

**Purpose:** Anything dynamic, e.g. from a user object from the database.

Use it like this:

```js
var renderPage = salamandra.render("<page>")
app.get("/", function(req, res, next){
  req.context = {
    user: User.find(req.params.id)
  }
  renderPage.call(this, req, res, next)
})
```

#### static context

This is an intermediary context merged from global and page contexts.
In development it's always fresh.
In production it's created only once, cached and reused every time.

#### Merge order

  1. global
  2. page
  3. inline
  4. dynamic

They overwrite in this order, making dynamic the top context.
