var mkdirp = require("mkdirp")
var writeCwd = require("../utils/writeCwd")
var template = require("../utils/template")
var async = require("async")
var glob = require("glob")

var dirs = [
  "app/",
  "app/config/",
  "app/context/",
  "bundles/",
  //"bundles/sprite/",
  //"bundles/templates/",
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
  "app.js",
  "gulpfile.js"
]
  .concat(glob.sync("app/**/*.*", {cwd: __dirname+"/../templates"}))
  .concat(glob.sync("tasks/*.js", {cwd: __dirname+"/../templates"}))
  .concat(glob.sync("layouts/*.dust", {cwd: __dirname+"/../templates"}))

module.exports = init

function init( context ){
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
