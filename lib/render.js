var config = require("./config")()
var engine = require("./engine")(config.engine)
var error = require("./error")
var path = require("path")
var getPageFilePath = require("../utils/getPageFilePath")
var createContext = require("../utils/createContext")

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
        message: err ? err.message : "Error rendering page",
        context: renderContext,
        status: 404
      }))

      res.send(template)
    })
  }
}

render.template = function template(page, inlineContext, cb) {
  var pagePath = getPageFilePath(page, "index.dust")
  var renderContext = createContext(page, inlineContext)

  engine.render(pagePath, renderContext, function( err, template ){
    cb(err, template)
  })
}
