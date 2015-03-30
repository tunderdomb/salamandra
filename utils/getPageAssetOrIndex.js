var path = require("path")
var normalizePath = require("../utils/normalizePath")

/**
 * Return a page asset path from a page accessor like "home" or "home/something" and an extension
 * If the accessor is a simple string, the index is assumed.
 *
 * For "home", "dust" it returns "home/index.dust"
 * For "home/something", "dust" it returns "home/something.dust"
 * */
module.exports = function getPageAssetOrIndex( page, ext ){
  ext = "."+ext.replace(/^\./)
  if( !~page.indexOf("/") ){
    // a simple string like "home" assumes the index template at "pages/home/index.dust"
    return normalizePath(path.join("pages", page, "index"+ext))
  }
  else {
    // any other string like "some/thing" assumes "pages/some/thing.dust"
    return normalizePath(path.join("pages", page+ext))
  }
}
