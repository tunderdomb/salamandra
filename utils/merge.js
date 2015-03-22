/**
 * Merge two objects leaving both intact.
 * @param obj{Object} this object will be cloned
 * @param extension{Object} this object will overwrite existing properties, extending the clone
 * @return Object a brand new object with merged values
 * */
function merge( obj, extension ){
  return [].reduce.call(arguments, function( ret, obj ){
    for ( var prop in obj ) {
      if( obj.hasOwnProperty(prop) ) {
        ret[prop] = obj[prop]
      }
    }
    return ret
  }, {})
}

module.exports = merge
