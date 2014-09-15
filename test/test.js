
var assert = require('assert')
var utils = require('..')

describe('contentDisposition(filename)', function () {
  it('should return raw ascii characters', function () {
    assert.equal(utils.contentDisposition('foo.txt'),
      'attachment; filename="foo.txt"')
  });

  it('should return encode non-ascii characters with utf-8', function () {
    assert.equal(utils.contentDisposition('foo-ä.html'),
      'attachment; filename="foo-%C3%A4.html"; filename*=UTF-8\'\'foo-%C3%A4.html')
  })

  it('should return encode Chinese characters with utf-8', function () {
    assert.equal(utils.contentDisposition('中文文件名.html'),
      'attachment; filename="%E4%B8%AD%E6%96%87%E6%96%87%E4%BB%B6%E5%90%8D.html"; filename*=UTF-8\'\'%E4%B8%AD%E6%96%87%E6%96%87%E4%BB%B6%E5%90%8D.html')
  })

  it('should return `attachment` when filename not exists', function () {
    assert.equal(utils.contentDisposition(''), 'attachment')
    assert.equal(utils.contentDisposition(), 'attachment')
    assert.equal(utils.contentDisposition(null), 'attachment')
  })
})
