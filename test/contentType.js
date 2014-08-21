
var assert = require('assert');
var utils = require('..');

var invalidTypes = [
  ' ',
  'null',
  'undefined',
  '/',
  'text/;plain',
  'text/"plain"',
  'text/p£ain',
  'text/(plain)',
  'text/@plain',
  'text/plain,wrong',
];

describe('contentType', function () {
  describe('parse', function () {
    var parse = utils.headers.contentType.parse;

    it('should parse basic type', function () {
      var type = parse('text/html');
      assert.equal(type.type, 'text');
      assert.equal(type.subtype, 'html');
    });

    it('should parse with suffix', function () {
      var type = parse('image/svg+xml');
      assert.equal(type.type, 'image');
      assert.equal(type.subtype, 'svg+xml');
    });

    it('should parse parameters', function () {
      var type = parse('text/html; charset=utf-8; foo=bar');
      assert.equal(type.type, 'text');
      assert.equal(type.subtype, 'html');
      assert.equal(type.parameters.charset, 'utf-8');
      assert.equal(type.parameters.foo, 'bar');
    });

    it('should parse parameters with extra LWS', function () {
      var type = parse('text/html ; charset=utf-8 ; foo=bar');
      assert.equal(type.type, 'text');
      assert.equal(type.subtype, 'html');
      assert.equal(type.parameters.charset, 'utf-8');
      assert.equal(type.parameters.foo, 'bar');
    });

    it('should lower-case type', function () {
      var type = parse('IMAGE/SVG+XML');
      assert.equal(type.type, 'image');
      assert.equal(type.subtype, 'svg+xml');
    });

    it('should lower-case parameter names', function () {
      var type = parse('text/html; Charset=UTF-8');
      assert.equal(type.parameters.charset, 'UTF-8');
    });

    it('should unquote parameter values', function () {
      var type = parse('text/html; charset="UTF-8"')
      assert.equal(type.parameters.charset, 'UTF-8');
    });

    it('should unquote parameter values with escapes', function () {
      var type = parse('text/html; charset="UT\\F-\\\\\\"8\\""')
      assert.equal(type.parameters.charset, 'UTF-\\"8"');
    });

    it('should handle balanced quotes', function () {
      var type = parse('text/html; param="charset=\\"utf-8\\"; foo=bar"; bar=foo');
      assert.equal(Object.keys(type.parameters).length, 2);
      assert.equal(type.parameters.param, 'charset="utf-8"; foo=bar');
      assert.equal(type.parameters.bar, 'foo');
    });

    invalidTypes.forEach(function (type) {
      it('should throw on invalid media type ' + type, function () {
        assert.throws(parse.bind(null, type));
      });
    });
  });
});
