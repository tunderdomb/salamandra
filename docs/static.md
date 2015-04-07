static
======

It's just a shortcut for `express.static()`
which already contains the `static/` prefix,
so you only have to define options.

Use it like this:

```js
app.use(salamandra.static({ /* options */ }))
```

Now files in your `static/` folder will be served.
