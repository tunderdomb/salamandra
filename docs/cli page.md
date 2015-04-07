page
====

    salamandra page <page>

Salamandra comes with some buitl in cli commands
that help you manage your project.

`page <page>` is one of them.

It creates a page in your `pages/` folder with the name you provided.
It also scaffolds every file you need (and salamandra uses).

## Related files

    pages/
      <page>
        client.js
        context.json
        index.dust
        index.styl
        route.js

This is the basic structure you'll get.

### client.js

This is the entry point for browsers scripts.

### context.json

Page specific values like the title can go here.

### index.dust

This will be used to render the page.
By default, it extends `layouts/page`

### index.styl

The entry point for the page's stylesheet.
If you use the built in stylesheet features,
salamandra will create `static/css/<page>/index.css` from this.

### route.js

You can use this to wire up the page. Check out the template
it simple contains an express router and a `salamandra.render()` call,
already containing the names you provided.
