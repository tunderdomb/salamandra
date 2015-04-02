var env = process.env.NODE_ENV
var requireCwd = require("../utils/requireCwd")
var merge = require("../utils/merge")

var globalConfig = requireCwd.safe("app/config/global")

module.exports = function( forceEnv ){
  var config = {}

  switch( forceEnv||env ){
    case "development":
    case "dev":
      config = requireCwd.safe("app/config/development")
      config.development = config.dev = true
      config.production = config.prod = false
      config.test = false
      env = "development"
      break
    case "test":
      config = requireCwd.safe("app/config/test")
      config.development = config.dev = false
      config.production = config.prod = false
      config.test = true
      break
    case "production":
    case "prod":
    default:
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
