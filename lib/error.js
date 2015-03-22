module.exports = function( options ){
  return new Error(options)
}

function Error( options ){
  this.error = options.error || null
  this.status = options.status || null
  this.message = options.message || ""
  this.context = options.context || null
}
