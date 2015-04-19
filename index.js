var salamandra = {}
module.exports = salamandra

salamandra.express = require("express")

salamandra.getConfig = require("./lib/config")
salamandra.config = require("./lib/config")()
salamandra.getContext = require("./lib/context")
salamandra.context = require("./lib/context")()
salamandra.engine = require("./lib/engine")
salamandra.render = require("./lib/render")
salamandra.static = require("./lib/static")
salamandra.error = require("./lib/error")
salamandra.livereload = require("./lib/livereload")
salamandra.style = require("./lib/style")
salamandra.client = require("./lib/client")
