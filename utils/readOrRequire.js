var config = require("../lib/config")()
var read = require("./read")
var readJSON = require("../utils/readJSON")

/**
 * Depending on the environment read or require a file
 * Because require conveniently parses json files
 * we provide that functionality for sync reads too
 * with the limitation that you have to provide the `.json`
 * extension in the path.
 * */
module.exports = function readOrRequire( src ){
  return config.development
    ? /\.json/.test(src) ? readJSON(src) : read(src)
    : require(src)
}