var config = require("./config")
var engine = require("./engine")(config.engine)
var error = require("./error")
var path = require("path")
var readOrRequire = require("../utils/readOrRequire")
var merge = require("../utils/merge")
var globalContext = require("./context")
var getPageFilePath = require("../utils/getPageFilePath")

module.exports = render

/**
 * Renders a page by its name.
 * For "home" it uses "home/index.dust" and "home/context.json"
 * For "home/something" it uses "home/something/index.dust" and "home/something/context.json"
 * */
function render( page, inlineContext ){
  var pagePath = getPageFilePath(page, "index.dust")

  return function( req, res, next ){
    var renderContext = createContext(page, inlineContext, req.context)
    engine.render(pagePath, renderContext, function( err, template ){
      if( err ) return next(error({
        error: err,
        status: 404
      }))

      res.send(template)
    })
  }
}

function createContext( page, inlineContext, dynamicContext ){
  var pageContext = {}
  try{
    pageContext = readOrRequire(getPageFilePath(page, "context.json"))
  }
  catch( e ){
    // this page doesn't have a context
    console.warn("Missing static context from pages/%s", page)
  }
  // TODO: in production, the global+pageContext could be cached
  return merge(globalContext, pageContext, inlineContext, dynamicContext)
}
