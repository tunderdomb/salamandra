var salamandra = require("salamandra")

module.exports = function( app ){
  app.get("/{{page}}", salamandra.render("{{page}}"))
}
