var fs = require("fs")

/**
 * Read a file from the filesystem.
 * @param src{String} file path
 * @param [cb]{Function}
 * @return String|null
 * */
function read( src, cb ){
  if( cb ){
    return fs.readFile(src, "utf8", cb)
  }
  else try {
    return fs.readFileSync(src, "utf8")
  }
  catch ( e ) {
    return null
  }
}
module.exports = read
