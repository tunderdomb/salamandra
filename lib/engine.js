var dust = require("dustjs-linkedin")
var helpers = require("dustjs-helpers")

var renameExtension = require("../utils/renameExtension")
var normalizePath = require("../utils/normalizePath")
var read = require("../utils/read")
var path = require("path")

var origFormatter = dust.optimizers.format
var whiteSpacePreserver = function ( ctx, node ){ return node }

var CWD = process.cwd()
var CACHE = false

function engine( options ){
  if( !options ) {
    return engine
  }

  if( "cache" in options )
    engine.enableCache(options.cache)
  if( "whitespaceCompression" in options )
    engine.enableWhitespaceCompression(options.whitespaceCompression)
  if( "whiteSpaceCompression" in options )
    engine.enableWhitespaceCompression(options.whiteSpaceCompression)

  return engine
}

module.exports = engine

engine.enableCache = function( enable ){
  CACHE = !!enable
}
engine.enableWhitespaceCompression = function( enable ){
  if( enable ){
    dust.optimizers.format = origFormatter
  }
  else {
    dust.optimizers.format = whiteSpacePreserver
  }
}
engine.render = function( template, context, cb ){
  var src = createTemplatePath(template)
  dust.render(src, context, cb)
}
engine.stream = function( template, context ){
  var src = createTemplatePath(template, context)
  return dust.stream(src, context)
}
engine.compile = function( template, context, cb ){
  var src = createTemplatePath(template)
  dust.compile(src, context, cb)
}

dust.onLoad = function ( name, processTemplate ){
  name = createTemplatePath(name)
  read(name, function( err, src ){
    if( err ){
      processTemplate(new Error("Template not found '"+name+"'"))
    }
    else {
      processTemplate(err, src)
    }

    if( !CACHE ) {
      dust.cache = {}
    }
  })
}

function createTemplatePath( name ){
  name = renameExtension(name, "dust")
  name = path.resolve(CWD, name)
  // backslashes are stripped by dust when saving to cache,
  // we need to convert them to forward slashes so they are preserved
  return normalizePath(name)
}
