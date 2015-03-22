var requireCwd = require("../utils/requireCwd")

module.exports = function(  ){
  switch( process.env.NODE_ENV ){
    case "development":
    case "dev":
      return requireCwd.safe("app/context/development")
    case "test":
      return requireCwd.safe("app/context/test")
    case "production":
    case "prod":
    default:
      return requireCwd.safe("app/context/production")
  }
}
