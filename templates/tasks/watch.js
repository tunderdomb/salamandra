/* watch static assets */
var gulp = require("gulp")

gulp.task("watch", function(  ){
  gulp.watch("**/*.styl", ["style"])
  gulp.watch("pages/**/*.js", ["browserify"])
})
