var salamandra = {}
module.exports = salamandra

salamandra.express = require("express")

salamandra.config = require("./lib/config")
salamandra.engine = require("./lib/engine")
salamandra.context = require("./lib/context")
salamandra.render = require("./lib/render")
salamandra.error = require("./lib/error")
