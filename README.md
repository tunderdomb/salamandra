salamandra
==========

Do you like web apps? Do you like *writing* web apps?
Ever thought that project scaffolding could be less painful and more straightforward?

Use salamandra to quickly make a project, easily create pages and serve the app with express.

**NOTE: this module is work in progress**

## Install

```
npm install salamandra --save
```

## Init project

```
salamandra init
```

## Create pages

```
salamandra page <name>
```

## Run

```
node app
```

## Development

Install gulp

```
npm install gulp --save
```

Create a page (edit it at `pages/home/`).

```
salamandra page home
```

Initialize the new page's static assets

```
gulp compile
```

Add the new page's route to the app (`app.js`)

```js
require("./pages/home/route")(app)
```

Run the development environment

```
node app dev
```

Run gulp to watch files and compile on change

```
gulp
```

Open `localhost:8000/home`.


## Docs

Check out the [docs](docs) for more!

## Licence

MIT
