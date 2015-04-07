var path = require("path")
var fs = require("fs")
var stylus = require("stylus")
var autoprefixer = require("autoprefixer-core")
var CleanCSS = require('clean-css')
var through2 = require("through2")
var renameExtension = require("../utils/renameExtension")
var getConfig = require("../lib/config")
var config = getConfig()
var createContext = require("../utils/createContext")
var merge = require("../utils/merge")

var stylusOptions = config.style.stylus
var defaultBrowsers = config.style.browsers
var minifyOptions = config.style.minify
// TODO: create a template for this and use the export in the Style constructor for the functions options
// TODO: provide some pre-defined functions like img-url() that generates a /static/img/... like string
//var globalFunctions = requireCwd("style")

module.exports = style

function style( page, options ){
  return new Style(page, options)
}
style.stream = function( options ){
  return new Style(null, options).stream()
}
style.render = function( page, options, cb ){
  new Style(page, options).render(cb)
}
style.task = function( gulp, options ){
  return gulp
    .src(["pages/**/index.styl"])
    .pipe(style.stream(options))
    .pipe(gulp.dest("static/css/"))
    .pipe(minify(options ? options.minify : {}))
    .pipe(gulp.dest("static/css/"))
}
style.gulp = function( gulp, options ){
  gulp.task("style", function(  ){
    return style.task(gulp, options)
  })
  gulp.watch("**/*.styl", ["style"])
}

function Style( page, options ){
  options = options || {}
  this.src = page
  this.stylusOptions = merge(stylusOptions, options.stylus || {})
  //options = options || {};
  //options.globals = options.globals || {};
  //options.functions = options.functions || {};
  //options.use = options.use || [];
  //options.use = Array.isArray(options.use) ? options.use : [options.use];
  //options.imports = [join(__dirname, 'functions')];
  //options.paths = options.paths || [];
  //options.filename = options.filename || 'stylus';

  // source maps are always used, but remove during minification
  // this means development env always gets sourcemaps, production never
  if( this.stylusOptions.sourcemap == undefined ){
    this.stylusOptions.sourcemap = {
      inline: true
    }
  }

  if( this.stylusOptions.globals == undefined ){
    this.stylusOptions.globals = {}
  }

  if( this.stylusOptions.functions == undefined ){
    this.stylusOptions.functions = {}
  }
  // TODO: merge stylus helpers into globals
  //this.stylusOptions.functions = merge({}, this.stylusOptions.functions)

  if( config.style.fresh ){
    defaultBrowsers = getConfig(true).style.browsers
  }
  this.browsers = options.browsers || defaultBrowsers
}

Style.prototype.render = function( cb ){
  var style = this

  fs.readFile(style.src, "utf-8", function( err, contents ){
    renderStylus(style.src, contents, style.stylusOptions, function( err, css ){
      if( err ){
        return cb(err)
      }
      var prefixed = autoprefix(css, style.browsers)
      cb(err, prefixed)
    })
  })
}

Style.prototype.stream = function(){
  var style = this

  return through2.obj(function( file, asd, cb ){
    var stream = this

    renderStylus(file.path, file.contents.toString(), style.stylusOptions, function( err, css ){
      if( err ){
        return cb()
      }
      var prefixed = autoprefix(css, style.browsers)
      file.contents = new Buffer(prefixed)
      file.path = renameExtension(file.path, "css")
      stream.push(file)
      cb()
    })
  })
}

function renderStylus( file, contents, options, cb ){
  file = path.resolve(process.cwd(), file)

  var renderer = stylus(contents)

  // try to figure out a page context for this file and merge it with style globals
  var pageRelative = path.relative(path.join(process.cwd(), "pages"), file)
  var page = path.dirname(pageRelative)
  var context = createContext(page, options.globals)
  // TODO: this doesn't seem to work properly (values are not available inside stylesheets)
  for( var name in context ){
    if( context.hasOwnProperty(name) ){
      renderer.define(name, context[name], true)
    }
  }

  renderer
    .set('filename', file)
    .set('sourcemap', options.sourcemap)
    .set('paths', [
      // include project root
      process.cwd(),
      // include file directory for relative paths
      path.dirname(file),
      // include node modules folder for easier library inclusion
      process.cwd()+"/node_modules"
    ].concat(options.paths||[]))

  if( Array.isArray(options.include) ){
    options.include.forEach(function( include ){
      renderer.include(include)
    })
  }
  if( Array.isArray(options.import) ){
    options.import.forEach(function( imp ){
      renderer.import(imp)
    })
  }

  try{
    renderer.render(function( err, css ){
      if( err ){
        console.error(err)
        return cb(err)
      }
      cb(null, css)
    })
  }
  catch( e ){
    cb(e)
  }
}

function autoprefix( contents, browsers ){
  if( typeof browsers == "string" ){
    browsers = browsers.split(/,\s*/)
  }
  var processor = autoprefixer({browsers: browsers, cascade: false})
  var prefixed = processor.process(contents)
  return prefixed.css
}

function minify( options ){
  if( config.style.fresh ){
    minifyOptions = getConfig(true).style.minify
  }
  options = merge(minifyOptions, options || {})

  return through2.obj(function( file, asd, cb ){
    var stream = this

    new CleanCSS(options).minify(file.contents.toString(), function( err, minified ){
      if( err ){
        console.error("Error minifying css")
        console.error(err)
        return cb()
      }

      file.contents = new Buffer(minified.styles)
      file.path = renameExtension(file.path, "min.css")
      stream.push(file)
      cb()
    })
  })
}