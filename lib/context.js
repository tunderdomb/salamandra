var requireCwd = require("../utils/requireCwd")
var merge = require("../utils/merge")
var config = require("../lib/config")()

var globalContext = requireCwd.safe("app/context/global")

module.exports = function( forceEnv ){
  var context = {}

  switch( forceEnv || config.env ){
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
  context = merge(globalContext, context)

  return context
}
