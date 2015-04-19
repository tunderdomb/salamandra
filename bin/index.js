#!/usr/bin/env node

var argv = require("minimist")(process.argv.slice(2))
var action = argv._[0]

switch( action ){
  // page <name>
  case "page":
    require("./page").apply(null, argv._.splice(1))
    break
  case "init":
    require("./init")(argv)
    break
}
