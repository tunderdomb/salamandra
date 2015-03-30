var fs = require("fs")
var cwdPath = require("./cwdPath")

module.exports = writeCwd

/**
 * Writes to the cwd.
 * If callback is provided it's async, else it's sync.
 * Returns or calls back with the created file path if it didn't existed before.
 * */
function writeCwd( src, content, cb ){
  src = cwdPath(src)
  if( cb ){
    fs.exists(src, function( exists ){
      if( exists ) cb()
      else fs.writeFile(src, content, "utf8", function( err ){
        if( err ) cb(err)
        else cb(null, src)
      })
    })
  }
  else if( !fs.existsSync(src) ) {
    fs.writeFileSync(src, content, "utf8")
    return src
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