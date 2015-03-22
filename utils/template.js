var fs = require("fs")
var path = require("path")
var template = require("lodash.template")

module.exports = function( src, context ){
  src = path.resolve(__dirname, "../templates/", src)
  var tpl = fs.readFileSync(src, "utf8")
  var fn = template(tpl)
  return fn(context)
}