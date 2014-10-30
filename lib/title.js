var http = require('http');
var fs = require('fs');
var async = require('async');

module.exports = function (callback) {
  var classNum = process.argv[2];
  var url = 'http://schoo.jp/class/' + classNum;
  var html = './title.html';

  function getHtml (cb) {
    var f = fs.createWriteStream(html);

    http.get(url, function (res) {
      res.on('data', function (chunk) {
        f.write(chunk);
      });

      res.on('end', function () {
        f.end();
        cb(null);
      });
    });
  }

  function getTitle (cb) {
    fs.readFile(html, {encoding: 'utf-8'}, function (err, data) {
      if (err) {
        throw err;
      }
      var title = data.split('<title>')[1].split('<\/title>')[0].split('先生')[0] + '先生';
      fs.unlinkSync(html);
      cb(null, title);
    });
  }

  async.waterfall([
    function (cb) {
      getHtml(cb);
    },
    function (cb) {
      getTitle(cb);
    }
  ], function (err, title) {
    if (err) {
      throw err;
    }
    callback(title);
  });
};

