var path = require("path")

module.exports = requireCwd

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

  return require(path.resolve(process.cwd(), src))
}

requireCwd.safe = function( src ){
  return requireCwd(src, true)
}