var salamandra = require("salamandra")
var app = salamandra.express()

// serve static files
app.use("/static", salamandra.static())

// initiate live reload (noop in production)
salamandra.livereload.inject(app)

// Require routes here..
//require("./pages/<page>/route")(app)

app.listen(salamandra.config.PORT, function(  ){
  console.log("app listening on %s (%s)", salamandra.config.PORT||"undefined port", salamandra.config.env)
  // start livereload server (noop in production)
  salamandra.livereload.start(app)
})