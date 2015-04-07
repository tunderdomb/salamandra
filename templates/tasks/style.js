var salamandra = require("salamandra")
var gulp = require("gulp")

gulp.task("style", function(  ){
  return salamandra.style.task(gulp, {
    stylus: {
      globals: {},
      functions: {},
      imports: []
    },
    // auto prefix
    browsers: ['last 3 versions']
  })
})
