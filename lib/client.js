var browserify = require("browserify")
var UglifyJS = require("uglify-js")
var glob = require("glob")
var async = require("async")
var merge = require("../utils/merge")
var through2 = require("through2")
var source = require("vinyl-source-stream")
var buffer = require("vinyl-buffer")
var renameExtension = require("../utils/renameExtension")
var getConfig = require("../lib/config")
var path = require("path")
var config = getConfig()

var client = module.exports = {}

var clientConfig = config.client
function refreshConfig(){
  if( config.style.fresh ){
    clientConfig = getConfig(true).client
  }
}

client.task = function( gulp, options, cb ){
  if( typeof options == "functions" ){
    cb = options
    options = {}
  }
  refreshConfig()
  glob("./pages/**/client.js", function( err, entries ){
    async.each(entries, function( entry, next ){
      var src = path.relative(process.cwd()+"/pages", entry)
      browserify(merge(clientConfig.browserify, options, {
        entries: entry
      }))
        .bundle()
        .pipe(source(src))
        .pipe(gulp.dest("static/js/"))
        .pipe(buffer())
        .pipe(minify(options ? options.minify : {}))
        .pipe(gulp.dest("static/js/"))
        .on("end", next)
    }, cb)
  })
}

function minify( options ){
  refreshConfig()
  options = merge(clientConfig.minify, options || {}, {
    fromString: true
  })

  return through2.obj(function( file, asd, cb ){
    var stream = this

    var compiled = String(file.contents)

    var result = UglifyJS.minify(compiled, options)
    file.contents = new Buffer(result.code)
    file.path = renameExtension(file.path, "min.js")
    stream.push(file)
    cb()
  })
}
