var context = require("../lib/config")
var renameExtension = require("../utils/renameExtension")
var path = require("path")
var getStaticAssetUrl = require("../utils/getStaticAssetUrl")

module.exports = function( chunk, context, bodies, params ){
  var src = params.src || "client.js"
  var ctx = context.current()
  // if the user provides a src value, assume it contains the page part
  var page = params.src ? "" : ctx.page

  src = getStaticAssetUrl("js", page, src)
  // for a known non-development env request the minified file
  if( ctx.config && !ctx.config.dev ){
    src = renameExtension(src, "min.js")
  }
  else {
    src = renameExtension(src, "js")
  }

  var tag = '<script ' +
    'type="application/javascript" ' +
    'src="'+src+'"' +
    (params.async ? 'async' : "") +
    (params.defer ? 'defer' : "") +
    (params.id ? 'id' : "") +
    '></script>'

  return chunk.write(tag)
}
