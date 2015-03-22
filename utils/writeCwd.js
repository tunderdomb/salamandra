var fs = require("fs")
var cwdPath = require("./cwdPath")

module.exports = writeCwd

function writeCwd( src, content, cb ){
  src = cwdPath(src)
  if( cb ){
    fs.exists(src, function( exists ){
      if( exists ) cb()
      else fs.writeFile(src, content, "utf8", cb)
    })
  }
  else if( !fs.existsSync(src) ) {
    fs.writeFileSync(src, content, "utf8")
  }
}

writeCwd.overwrite = function( src, content, cb ){
  src = cwdPath(src)
  if( cb ){
    fs.writeFile(src, content, "utf8", cb)
  }
  else {
    fs.writeFileSync(src, content, "utf8")
  }
}