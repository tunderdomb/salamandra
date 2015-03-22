var mkdirp = require("mkdirp")
var writeCwd = require("../utils/writeCwd")
var path = require("path")
var read = require("../utils/read")
var template = require("../utils/template")

var files = [
  "page/context.js",
  "page/index.dust",
  "page/route.js"
]

module.exports = createPage

function createPage( name ){
  if( !name ){
    console.error("Can't create page: missing argument 'name'")
    return
  }

  var context = {
    name: name
  }
  debugger
  files.forEach(function( file ){
    writeCwd(path.join(name, file), template(file, context))
  })
}
