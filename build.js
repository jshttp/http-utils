/*!
 * http-utils
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var fs = require('fs');
var headers = require('./headers');
var path = require('path');
var PEG = require('pegjs');

/**
 * Module variables.
 */

var dir = path.resolve(__dirname, 'src');
var input = '';
var parserPath = path.resolve(__dirname, 'parser.js');

var headerRules = headers.map(function (header) {
  return header.replace(/-/g, '_');
});

/**
 * Read source files.
 */

fs.readdirSync(dir).sort().forEach(function (file) {
  console.log('read ' + file);
  input += fs.readFileSync(path.resolve(dir, file), 'ascii') + '\n';
});

/**
 * Generate parser.
 */

console.log('generate');
var source = PEG.buildParser(input, {
  allowedStartRules: headerRules,
  optimize: 'speed',
  output: 'source'
});

/**
 * Wrap source.
 */

source = '/*!\n'
  + ' * http-utils\n'
  + ' * Copyright(c) 2014 Douglas Christopher Wilson\n'
  + ' * MIT Licensed\n'
  + ' */\n'
  + '\n'
  + 'module.exports = ' + source + ';\n'

/**
 * Write parser.
 */

console.log('write');
fs.writeFileSync(parserPath, source);
