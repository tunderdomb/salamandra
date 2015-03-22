var config = null
var env = process.env.NODE_ENV
var requireCwd = require("../utils/requireCwd")

switch( env ){
  case "development":
  case "dev":
    config = requireCwd.safe("app/config/development")
    config.development = config.dev = true
    env = "development"
    break
  case "test":
    config = requireCwd.safe("app/config/test")
    config.test = true
    break
  case "production":
  case "prod":
  default:
    config = requireCwd.safe("app/config/production")
    config.production = config.prod = true
    env = "production"
}

config.env = env
module.exports = config