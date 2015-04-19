/* browserify task */
var salamandra = require("salamandra")
var gulp = require("gulp")

gulp.task("browserify", function( cb ){
  salamandra.client.task(gulp, {
    browserify: {
      // options for browserify
    },
    minify: {
      // options for uglifyjs
    }
  }, cb)
})
