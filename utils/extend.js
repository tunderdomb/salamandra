/**
 * Extend an object with another's properties.
 * @param obj{Object} original object to extend
 * @param extension{Object} object with extension properties
 * @return Object obj the extended object
 * */
function extend( obj, extension ){
  for ( var prop in extension ) {
    obj[prop] = extension[prop]
  }
  return obj
}

module.exports = extend
