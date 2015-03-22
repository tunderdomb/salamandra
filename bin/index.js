var argv = require("minimist")(process.argv.slice(2))
var action = argv._[0]

switch( action ){
  // page <name>
  case "page":
    var name = argv._[1]
    require("./page")(name)
    break
  case "init":
    require("./init")(argv)
    break

}