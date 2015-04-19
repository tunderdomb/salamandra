var gulp = require("gulp")

require("./tasks/style")
require("./tasks/browserify")
require("./tasks/compile")
require("./tasks/watch")

gulp.task("default", ["watch"])
