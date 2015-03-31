var requireCwd = require("../utils/requireCwd")
var merge = require("../utils/merge")
var config = require("../lib/config")

var globalContext = requireCwd.safe("app/context/global")

module.exports = function context(  ){
  var context = {}

  switch( process.env.NODE_ENV ){
    case "development":
    case "dev":
      context = requireCwd.safe("app/context/development")
      break
    case "test":
      context = requireCwd.safe("app/context/test")
      break
    case "production":
    case "prod":
    default:
      context = requireCwd.safe("app/context/production")
  }

  context.config = config

  return merge(globalContext, context)
}
