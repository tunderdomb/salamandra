var gulp = require("gulp")

require("./tasks/style")
require("./tasks/browserify")

gulp.task("default", ["style", "browserify"])

gulp.watch("**/*.styl", ["style"])
gulp.watch("pages/**/*.js", ["browserify"])