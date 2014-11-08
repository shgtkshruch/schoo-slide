var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
var async = require('async');
var Slide = require('./lib/slide');
var Imagemagic = require('./lib/imagemagic');
var Title = require('./lib/title');
var nodeNote = require('node-note');
var config = require('./config.json');

var dir = 'images/';

module.exports = function (classNum) {
  async.waterfall([
    function (cb) {
      fs.mkdir(dir, function () {
       cb(null);
      });
    },
    function (cb) {
      async.parallel([
        function (cb) {
          Slide(classNum, dir, function () {
           cb(null);
          });
        },
        function (cb) {
          Title(classNum, function (title) {
            cb(null, title);
          });
        }
      ], function (err, result) {
        if (err) {
          throw err;
        }
        cb(null, result[1]);
      });
    },
    function (title, cb) {
      Imagemagic(title, dir, function (pdf) {
       cb(null, title, pdf);
      });
    },
    function (title, pdf, cb) {
      var options = {
        title: title,
        file: path.resolve(pdf),
        notebookName: '1302 schoo',
        tag: ['slide']
      }
      var evernote = new nodeNote(config);
      evernote.createNote(options, function (note) {
        console.log('Create new note: ' + title);
        cb(null, pdf);
      });
    },
    function (pdf, cb) {
      async.each([dir, pdf], function (f, cb) {
        rimraf(f, function (err) {
          cb(null);
        });
      }, function (err) {
        if (err) {
          throw err;
        }
        cb(null);
      });
    }
  ], function (err, result) {
    if (err) {
      throw err;
    }
    console.log('All task done.');
  });
}
