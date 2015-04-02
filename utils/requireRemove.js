module.exports = function requireRemove( modulePath ){
  if( require.cache && require.cache.hasOwnProperty(modulePath = require.resolve(modulePath)) ) {
    if( !(delete require.cache[modulePath]) ){
      console.warn("Couldn't remove module path from require cache: '%s'", modulePath)
    }
  }
}