var path = require("path")
var normalizePath = require("./normalizePath")

module.exports = function( src ){
  return normalizePath(path.resolve(process.cwd(), src))
}