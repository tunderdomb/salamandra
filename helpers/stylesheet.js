var context = require("../lib/config")
var renameExtension = require("../utils/renameExtension")
var path = require("path")
var getStaticAssetUrl = require("../utils/getStaticAssetUrl")

module.exports = function( chunk, context, bodies, params ){
  var href = params.href || "index.css"
  var ctx = context.current()
  // if the user provides a href value, assume it contains the page part
  var page = params.href ? "" : ctx.page

  href = getStaticAssetUrl("css", page, href)
  // for a known non-development env request the minified file
  if( ctx.config && !ctx.config.dev ){
    href = renameExtension(href, "min.css")
  }
  else {
    href = renameExtension(href, "css")
  }
  var tag = '<link rel="stylesheet" href="'+href+'"/>'
  return chunk.write(tag)
}
