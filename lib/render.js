var config = require("./config")
var engine = require("./engine")(config.engine)
var error = require("./error")
var path = require("path")
var readOrRequire = require("../utils/readOrRequire")
var merge = require("../utils/merge")
var globalContext = require("./context")
var normalizePath = require("../utils/normalizePath")

module.exports = render

function render( page, inlineContext ){
  var pagePath
  if( !~page.indexOf("/") ){
    // a simple string like "home" assumes the index template at "pages/home/index.dust"
    pagePath = normalizePath(path.join("pages", page, "index.dust"))
  }
  else {
    // any other string like "some/thing" assumes "pages/some/thing.dust"
    pagePath = normalizePath(path.join("pages", page))
  }

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
    pageContext = readOrRequire(pageFile(page, "context.json"))
  }
  catch( e ){
    // this page doesn't have a context
    console.warn("Missing static context from pages/%s", page)
  }
  // TODO: in production, the global+pageContext could be cached
  return merge(globalContext, pageContext, inlineContext, dynamicContext)
}

function pageFile( page, src ){
  return path.resolve(process.cwd(), "pages", page, src)
}
