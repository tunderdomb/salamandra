var path = require("path")
var normalizePath = require("./normalizePath")

module.exports = function( file, newExt ){
  if( !file || !newExt ){
    console.error("Missing arguments")
    return
  }
  var dirName = path.dirname(file)+"/"
  newExt = "."+newExt.replace(/^\./, "")
  file = path.basename(file, path.extname(file))
  return normalizePath(dirName+file+newExt)
}
