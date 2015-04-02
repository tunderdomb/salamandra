var browserSync = require("browser-sync")
var getConfig = require("./config")
var config = getConfig()
var devConfig = null

var snippet = ""
if( config.dev ){
  devConfig = getConfig("dev")
  if( devConfig.livereload ){
    var browserSyncVersion = require("browser-sync/package.json").version
    var liveReloadScriptUrl = "//" + devConfig.host + ":" + devConfig.livereload.PORT + "/browser-sync/browser-sync-client." + browserSyncVersion + ".js"
    snippet += '<script async src="' + liveReloadScriptUrl + '"></script>'
    // save the inject snippet on the config
    config.inject = snippet
  }
}

module.exports.browserSync = browserSync

module.exports.start = function(){
  var defaults = {
    logSnippet: false,
    ghostMode: false,
    notify: false,
    port: devConfig.livereload.PORT,
    logLevel: "silent",
    files: [
      // TODO: these need to be un-required to refresh content
      "app/config/**/*.js",
      "app/context/**/*.js",

      "static/css/**/*.css",
      "static/js/**/*.js",

      "pages/**/*.dust",
      "pages/**/context.json",
      "snippets/**/*.dust",
      "layouts/*.dust"
    ]
  }
  browserSync(defaults, function( err ){
    if( err ){
      console.err("BrowserSync error")
      console.err(err)
      return
    }
    console.log("BrowserSync started")
  })
}

module.exports.inject = function( app ){
  if ( snippet ) {
    var inject = require("connect-inject")
    app.use(inject({snippet: snippet}))
  }
}
