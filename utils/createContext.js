var readOrRequire = require("../utils/readOrRequire")
var getPageFilePath = require("../utils/getPageFilePath")
var merge = require("../utils/merge")
var getContext = require("../lib/context")
var config = require("../lib/config")()
var staticContext = null

module.exports = function createContext( page, inlineContext, dynamicContext ){
  // in production, the global+pageContext could be cached
  if( config.dev || config.prod && !staticContext ){
    var globalContext = getContext(config.dev)
    var pageContext
    try{
      pageContext = readOrRequire(getPageFilePath(page, "context.json"))
    }
    catch( e ){
      // this page doesn't have a context
      console.warn("Can't find static context for '%s'", page)
    }
    staticContext = merge(globalContext, pageContext)
  }

  return merge(staticContext, inlineContext, dynamicContext, {
    // page name is always accessible
    // also used by style asset url helper
    page: page
  })
}
