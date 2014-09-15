/*!
 * http-utils
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var basename = require('path').basename

/**
 * Module exports.
 */

/**
 * Generate Content-Disposition header appropriate for the filename.
 * non-ascii filenames are urlencoded and a filename* parameter is added
 *
 * @param {String} filename
 * @return {String}
 * @api public
 * @see http://blog.fastmail.fm/2011/06/24/download-non-english-filenames/
 */

exports.contentDisposition = function (filename) {
  var ret = 'attachment'
  if (filename) {
    filename = basename(filename);
    // if filename contains non-ascii characters, add a utf-8 version ala RFC 5987
    ret = /[^\040-\176]/.test(filename)
      ? 'attachment; filename="' + encodeURI(filename) + '"; filename*=UTF-8\'\'' + encodeURI(filename)
      : 'attachment; filename="' + filename + '"'
  }

  return ret
};
