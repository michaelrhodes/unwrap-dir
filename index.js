var fs = require('fs')
var path = require('path')
var waterfall = require('run-waterfall')
var parallel = require('run-parallel')
var dir = require('is-dir')
var rm = require('rimraf')
var mv = require('mv')

module.exports = function (entry, cb) {
  fs.readdir(entry, function (err, contents) {
    if (err) return cb(err)
    if (contents.length !== 1)
      return cb(null, false)

    var wrapper = path.join(entry, contents[0])

    dir(wrapper, function (err, yes) {
      if (err) return cb(err)
      if (!yes) return cb(null, false) 
      waterfall([read, move, clean], end)
    })

    function read (next) {
      fs.readdir(wrapper, next)
    }

    function move (wrapped, next) {
      var moves = []
      wrapped.forEach(function (file) {
        moves.push(function (done) {
          var src = path.join(wrapper, file)
          var dest = path.join(entry, file)
          mv(src, dest, done)
        })
      })
      parallel(moves, next)
    }

    function clean (results, next) {
      rm(wrapper, next)
    }

    function end (err) {
      err ? cb(err) : cb(null, true)
    }
  })
}
