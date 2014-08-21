/*!
 * http-utils
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var headers = require('./headers');
var parser = require('./parser');

/**
 * Module exports.
 */

exports.headers = {};

headers.forEach(function (header) {
  var prop = header.replace(/-/g, '')
    .replace(/^[A-Z]/, function (c) { return c.toLowerCase(); });
  var rule = header.replace(/-/g, '_');

  function parse(str) {
    return parser.parse(str, {startRule: rule});
  }

  exports.headers[prop] = {
    parse: parse
  };
});
