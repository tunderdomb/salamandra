var gulp = require("gulp")

require("./tasks/style")
require("./tasks/browserify")

gulp.task("default", ["style", "browserify"], function(  ){
  gulp.watch("**/*.styl", ["style"])
  gulp.watch("pages/**/*.js", ["browserify"])
})
