var path = require("path")
var fs = require("fs")
var stylus = require("stylus")
var autoprefixer = require("autoprefixer-core")
var through2 = require("through2")
var renameExtension = require("../utils/renameExtension")
var config = require("../lib/config")
var createContext = require("../utils/createContext")
var requireCwd = require("../utils/requireCwd")

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
style.gulp = function( gulp, options ){
  return gulp
    .src(["pages/**/index.styl"])
    .pipe(style.stream(options))
    .pipe(gulp.dest("static/css/"))
}

function Style( page, options ){
  options = options || {}
  this.src = page
  this.stylusOptions = options.stylus || {}
  //options = options || {};
  //options.globals = options.globals || {};
  //options.functions = options.functions || {};
  //options.use = options.use || [];
  //options.use = Array.isArray(options.use) ? options.use : [options.use];
  //options.imports = [join(__dirname, 'functions')];
  //options.paths = options.paths || [];
  //options.filename = options.filename || 'stylus';
  if( this.stylusOptions.sourcemap == undefined ){
    if( config.development ){
      this.stylusOptions.sourcemap = {
        inline: true
      }
    }
  }

  if( this.stylusOptions.globals == undefined ){
    this.stylusOptions.globals = {}
  }

  if( this.stylusOptions.functions == undefined ){
    this.stylusOptions.functions = {}
  }
  // TODO: use global helpers
  // this.stylusOptions.functions = {}

  this.browsers = options.browsers || ['last 3 versions']
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

  // try to figure out a page context for this file and merge it with style globals
  var pageRelative = path.relative(path.join(process.cwd(), "pages"), file)
  var page = path.dirname(pageRelative)
  var context = createContext(page, options.globals)
  options.globals = context
  //console.log(context)
  //console.log(file, pageRelative)

  var renderer = stylus(contents)

  for( var prop in options ){
    if( options.hasOwnProperty(prop) ) {
      renderer.set(prop, options[prop])
    }
  }

  renderer
    .set('filename', file)
    .set('paths', [
      process.cwd(),
      // adding the file dir to the include paths
      // so relative imports will work
      path.dirname(file)
    ])

  try{
    renderer.render(function( err, css ){
      if( err ) {
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
