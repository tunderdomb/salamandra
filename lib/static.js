var express = require("express")
var normalizePath = require("../utils/normalizePath")
var merge = require("../utils/merge")

var defaults = {
  /** @type String Option for serving dotfiles. Possible values are "allow", "deny", and "ignore" */
  dotfiles: "ignore",
  /** @type Boolean Enable or disable etag generation */
  etag: true,
  /** @type Boolean Sets file extension fallbacks. */
  extensions: false,
  /** @type Boolean|String Sends directory index file. Set false to disable directory indexing. */
  index: false,
  /** @type Boolean Set the Last-Modified header to the last modified date of the file on the OS. Possible values are true or false. */
  lastModified: true,
  /** @type Number|String Set the max-age property of the Cache-Control header in milliseconds or a string in ms format */
  maxAge: 0,
  /** @type Boolean Redirect to trailing “/” when the pathname is a directory. */
  redirect: false,
  /** @type Function Function for setting HTTP headers to serve with the file. */
  setHeaders: null
}

module.exports = function( options ){
  options = merge(defaults, options)
  return express.static(normalizePath(process.cwd()+"/static"), options)
}
