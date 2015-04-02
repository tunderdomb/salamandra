var path = require("path")
var normalizePath = require("../utils/normalizePath")

/**
 * Returns an absolute path constructed from a page and a file.
 * For "home", "context.json" it returns <cwd>/pages/home/context.json
 * For "home/something", "context.json" it returns <cwd>/pages/home/something/context.json
 * */
module.exports = function getPageFilePath( page, file ){
  return normalizePath(path.resolve(process.cwd(), "pages", page, file))
}
