var path = require("path")

module.exports = function( file, newExt ){
  var dirName = path.dirname(file)+"/"
  newExt = "."+newExt.replace(/^\./, "")
  file = path.basename(file, path.extname(file))
  return dirName+file+newExt
}
