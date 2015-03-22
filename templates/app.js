var salamandra = require("salamandra")
var app = salamandra.express()

// Require routes here..
//require("./pages/<page>/route")(app)

app.listen(salamandra.config.PORT, function(  ){
  console.log("app listening (%s)", salamandra.config.env)
  console.log("config", salamandra.config)
})