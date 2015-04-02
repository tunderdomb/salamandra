var env = process.env.NODE_ENV
var requireCwd = require("../utils/requireCwd")
var merge = require("../utils/merge")
var globalConfig = null
var config = null

/**
 * Returns the merged values of the user defined config files.
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

  switch( forceEnv||env ){
    case "development":
    case "dev":
      if( fresh ){
        requireCwd.remove("app/config/global")
        requireCwd.remove("app/config/development")
      }

      globalConfig = requireCwd.safe("app/config/global")
      config = requireCwd.safe("app/config/development")
      config.development = config.dev = true
      config.production = config.prod = false
      config.test = false
      env = "development"
      break
    case "test":
      if( config ) return config

      globalConfig = globalConfig || requireCwd.safe("app/config/global")
      config = requireCwd.safe("app/config/test")
      config.development = config.dev = false
      config.production = config.prod = false
      config.test = true
      env = "test"
      break
    case "production":
    case "prod":
    default:
      if( config ) return config

      globalConfig = globalConfig || requireCwd.safe("app/config/global")
      config = requireCwd.safe("app/config/production")
      config.production = config.prod = true
      config.development = config.dev = false
      config.test = false
      env = "production"
  }

  config = merge(globalConfig, config)
  config.env = env

  return config
}
