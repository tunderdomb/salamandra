style
=====

Salamandra comes with built in support for stylus.
Stylesheet creation also includes minification and auto prefixing.

```js
salamandra.style()
salamandra.style.stream
salamandra.style.render
salamandra.style.task
salamandra.style.gulp
```

### `salamandra.style(page, options)`

`page` is used to create a page context,
so you have access to the same values that page rendering is using.

This is a great way to share values between your html templates, your scripts and stylesheets.

Returns a `Style` object you can `.render()` or `stream`.

For the available options, see the [global config template](/templates/app/config/global.js/)

### `salamandra.style.stream(page, options)`

Shortcut for `salamandra.style().stream()`

### `salamandra.style.render(page, options, cb)`

Shortcut for `salamandra.style().render()`

### `salamandra.style.task(gulp, options)`

It does this:

```js
return gulp
    .src(["pages/**/index.styl"])
    .pipe(style.stream(options))
    .pipe(gulp.dest("static/css/"))
    .pipe(minify(options ? options.minify : {}))
    .pipe(gulp.dest("static/css/"))
```

### `salamandra.style.gulp(gulp, options)`

It does this:

```js
gulp.task("style", function(  ){
    return style.task(gulp, options)
  })
  gulp.watch("**/*.styl", ["style"])
```

### dust stylesheet tag

Depending on the environment it outputs a `link` tag.
Of production, it outputs a `href` attribute with a `min.css` ending, otherwise a `.css` ending.

```dust
{@stylesheet/}
```

Without parameters it outputs the entry stylesheet for the page (`index.css`).
If you render `home`, the output will be:

```html
<link rel="stylesheet" href="/static/css/home/index.css>
```

#### parameters

The stylesheet helper accepts an optional `href` parameter:

```dust
{@stylesheet href="hello.css"/}
```

Outputs:

```html
`<link rel="stylesheet" href="/static/css/hello.css`
```
