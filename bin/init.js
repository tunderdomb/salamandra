var mkdirp = require("mkdirp")
var writeCwd = require("../utils/writeCwd")
var template = require("../utils/template")
var async = require("async")

var dirs = [
  "app/",
  "app/config/",
  "app/context/",
  "bundles/",
  "bundles/sprite/",
  "bundles/templates/",
  "layouts/",
  "pages/",
  "snippets/",
  "static/",
  "static/css/",
  "static/font/",
  "static/img/",
  "static/js/",
  "static/sprite/",
  "style/",
  "tasks/"
]
var files = [
  // config
  "app/config/development.js",
  "app/config/production.js",
  "app/config/test.js",
  // context
  "app/context/development.js",
  "app/context/production.js",
  "app/context/test.js",
  // layouts
  "layouts/page.dust"
]

module.exports = init

function init( context ){
  debugger
  async.series([
    function createDirs( next ){
      async.each(dirs, function( dir, next ){
        mkdirp(dir, next)
      }, next)
    },
    function copyFiles( next ){
      async.each(files, function( file, next ){
        var content = template(file, context)
        writeCwd(file, content, next)
      }, next)
    }
  ], function done( err ){
    if( err ){
      console.error("Error building project")
      console.error(err)
    }
    else {
      console.info("Project is ready")
    }
  })
}
