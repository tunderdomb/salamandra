var mkdirp = require("mkdirp")
var writeCwd = require("../utils/writeCwd")
var path = require("path")
var template = require("../utils/template")
var glob = require("glob")

var files = glob.sync("**/*.*", {cwd: __dirname+"/../templates/page"})

module.exports = createPage

function createPage( name ){
  if( !name ){
    return console.error("Can't create page: missing argument 'name'")
  }

  name = ""+name

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

    var createdFiles = []

    files.forEach(function( file ){
      var projectFile = path.join(pageDir, file)
      var templateFile = path.join("page", file)
      var createdFile = writeCwd(projectFile, template(templateFile, context))
      if( createdFile ){
        createdFiles.push(createdFile)
      }
    })

    if( createdFiles.length){
      console.log("Created page %s with file(s):", name)
      console.log(createdFiles.join("\n"))
    }
    else {
      console.log("Page already exists")
    }
  })
}
