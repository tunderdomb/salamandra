var gulp = require("gulp")

require("./tasks/style")
require("./tasks/browserify")

gulp.task("compile", ["style", "browserify"])

gulp.task("default", function(  ){
  gulp.watch("**/*.styl", ["style"])
  gulp.watch("pages/**/*.js", ["browserify"])
})
