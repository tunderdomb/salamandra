client
=====

Salamandra comes with out-of-the-box support for browserify and uglifyjs.

The predefined gulp task already contains a script to run browserify,
you only need to provide configurations.

### script helper tag for dust

Depending on the environment it outputs a `script` tag.
Of production, it outputs a `src` attribute with a `min.js` ending, otherwise a `.js` ending.

```dust
{@script/}
```

Without parameters it outputs a script tag
with the currently rendered page's `client.js` url.

If you render `home`, it will output:

```html
<script type="text/javascript" src="/static/js/home/client.js"></script>
```

#### parameters

The helper tag supports some parameters, all are optional:

```dust
{@script src="hello.js" async="true" defer="true" id="hello"/}
```

```html
<script type="text/javascript" src="/static/js/hello.js" async="true" defer="true" id="hello"></script>
```
