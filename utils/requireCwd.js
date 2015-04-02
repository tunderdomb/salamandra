var path = require("path")
var requireRemove = require("../utils/requireRemove")

module.exports = requireCwd

function resolveCwd( src ){
  return path.resolve(process.cwd(), src)
}

function requireCwd( src, safe ){
  if( safe ){
    try{
      return requireCwd(src)
    }
    catch( e ){
      console.warn("Couldn't require %s from cwd", src)
      // return an empty module export
      return {}
    }
  }

  return require(resolveCwd(src))
}

requireCwd.safe = function( src ){
  return requireCwd(src, true)
}

requireCwd.remove = function( src ){
  return requireRemove(resolveCwd(src))
}
