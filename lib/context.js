var requireCwd = require("../utils/requireCwd")
var merge = require("../utils/merge")
var getConfig = require("../lib/config")
var config = getConfig()
var globalContext = null
var context = null

/**
 * Returns the merged values of the user defined context files.
 *
 * @param {String|Boolean} [forceEnv] request a specific environment config
 * @param {Boolean} [fresh] request fresh values, not the cached config
 * @return {Object}
 * */
module.exports = function( forceEnv, fresh ){
  if( typeof forceEnv == "boolean" ){
    fresh = forceEnv
    forceEnv = null
  }

  switch( forceEnv || config.env ){
    case "development":
    case "dev":
      if( fresh ){
        config = getConfig(forceEnv, fresh)
        requireCwd.remove("app/context/global")
        requireCwd.remove("app/context/development")
      }

      globalContext = requireCwd.safe("app/context/global")
      context = requireCwd.safe("app/context/development")
      break
    case "test":
      if( context ) return context

      config = config || getConfig(forceEnv)
      globalContext = globalContext || requireCwd.safe("app/context/global")
      context = requireCwd.safe("app/context/test")
      break
    case "production":
    case "prod":
    default:
      if( context ) return context

      config = config || getConfig(forceEnv)
      globalContext = globalContext || requireCwd.safe("app/context/global")
      context = requireCwd.safe("app/context/production")
  }

  context.config = config
  context = merge(globalContext, context)

  return context
}
