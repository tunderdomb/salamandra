var normalizePath = require("../utils/normalizePath")
var path = require("path")
module.exports = function getStaticAssetUrl( type, page, url ){
  return normalizePath(path.join("/static", type, page, url))
}
