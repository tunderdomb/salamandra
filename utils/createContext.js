var readOrRequire = require("../utils/readOrRequire")
var getPageFilePath = require("../utils/getPageFilePath")
var merge = require("../utils/merge")
var staticContext = require("../lib/context")

module.exports = function createContext( page, inlineContext, dynamicContext ){
  var pageContext = {}
  try{
    pageContext = readOrRequire(getPageFilePath(page, "context.json"))
  }
  catch( e ){
    // this page doesn't have a context
    console.warn("Can't find static context for '%s'", page)
  }
  // TODO: in production, the global+pageContext could be cached
  return merge(staticContext, pageContext, inlineContext, dynamicContext)
}
