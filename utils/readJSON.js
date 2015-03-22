var read = require("./read")

module.exports = readJSON

function readJSON( src, safe ){
  if( safe ){
    try{
      return JSON.parse(read(src))
    }
    catch( e ){
      return {}
    }
  }

  return JSON.parse(read(src))
}

readJSON.safe = function( src ){
  return readJSON(src, true)
}