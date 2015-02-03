var test = require('tape-catch')
var fs = require('fs')
var path = require('path')
var touch = require('touch').sync
var mkdir = require('mkdirp').sync
var rm = require('rimraf').sync
var ls = fs.readdirSync
var exists = fs.existsSync
var unwrap = require('./')

var base = path.join(__dirname, 'tmp')
var wrapper = path.join(base, '/wrap')
var child = path.join.bind(path, wrapper)
var dirs = [
  child('/deep/blue/sea')
]
var files = [
  child('one'),
  child('two'),
  child('three')
]

test('it works', function (assert) {
  assert.plan(6)
  setup()

  // Test initial state
  assert.equal(ls(base).length, 1)
  assert.equal(ls(wrapper).length, dirs.concat(files).length)

  unwrap(base, function (err, unwrapped) {
    // Test unwrapped state
    assert.equal(err, null)
    assert.equal(unwrapped, true)
    assert.equal(ls(base).length, dirs.concat(files).length)
    assert.equal(exists(wrapper), false)
    teardown()
  })
})

test('single entry is not a directory', function (assert) {
  assert.plan(2)
  setup()
  unwrap(dirs[0], function (err, unwrapped) {
    assert.equal(err, null)
    assert.equal(unwrapped, false)
    teardown()
  })
})

function setup () {
  teardown()
  mkdir(wrapper)
  dirs.forEach(function (dir) {
    mkdir(dir)
  })
  files.forEach(function (file) {
    touch(file)
  })
  // Single-entry; not a directory.
  touch(path.join(dirs[0], 'four'))
}

function teardown () {
  rm(base)
}
