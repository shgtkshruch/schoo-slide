var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
var async = require('async');
var Slide = require('./lib/slide');
var Imagemagic = require('./lib/imagemagic');
var Title = require('./lib/title');
var Evernote = require('nevernote');
var config = require('./config.json');

var dir = 'images/';

async.waterfall([
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
    Title(function (title) {
      cb(null, title);
    });
  },
  function (title, cb) {
    var imagemagic = new Imagemagic(title, dir);
    imagemagic.convert(function (pdf) {
     cb(null, title, pdf);
    });
  },
  function (title, pdf, cb) {
    var options = {
      title: title,
      file: path.resolve(pdf)
    }
    var evernote = new Evernote(config.develop.token);
    evernote.createNote(options, function (note) {
      cb(null, pdf);
    });
  },
  function (pdf, cb) {
    rimraf(pdf, function (err) {
      if (err) {
        throw err;
      }
      console.log('remove ' + pdf);
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
