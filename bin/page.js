var mkdirp = require("mkdirp")
var writeCwd = require("../utils/writeCwd")
var path = require("path")
var read = require("../utils/read")
var template = require("../utils/template")

var files = [
  "context.json",
  "index.dust",
  "route.js"
]

module.exports = createPage

function createPage( name ){
  if( !name ){
    console.error("Can't create page: missing argument 'name'")
    return
  }

  var context = {
    page: name
  }
  var pageDir = path.resolve(process.cwd(), "pages", name)
  mkdirp(pageDir, function( err ){
    if( err ){
      console.error("Error creating page")
      console.error(err)
      return
    }

    debugger

    files.forEach(function( file ){
      var projectFile = path.join(pageDir, file)
      var templateFile = path.join("page", file)
      writeCwd(projectFile, template(templateFile, context))
    })
  })
}
