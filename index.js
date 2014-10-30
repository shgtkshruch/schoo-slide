var fs = require('fs');
var rimraf = require('rimraf');
var async = require('async');
var Slide = require('./lib/slide');
var Imagemagic = require('./lib/imagemagic');

var dir = 'images/';

async.series([
  function (cb) {
    fs.mkdir(dir, function () {
     cb(null);
    });
  },
  function (cb) {
    var slide = new Slide(dir);
    slide.download(function () {
     cb(null);
    });
  },
  function (cb) {
    var imagemagic = new Imagemagic(dir);
    imagemagic.convert(function () {
     cb(null);
    });
  },
  function (cb) {
    rimraf(dir, function (err) {
      if (err) {
        throw err;
      }
      console.log('remove ' + dir + 'directory.');
      cb(null);
    });
  }
], function (err, result) {
  if (err) {
    throw err;
  }
  console.log('done');
});
