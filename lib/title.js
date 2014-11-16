var fs = require('fs');
var request = require('request');

module.exports = function (classNum, callback) {
  var url = 'https://schoo.jp/class/' + classNum;
  var html = './title.html';

  var f = fs.createWriteStream(html);

  request(url, function (err, res, body) {
    f.write(body);
    f.end();
    getTitle();
  });

  function getTitle () {
    fs.readFile(html, {encoding: 'utf-8'}, function (err, data) {
      if (err) throw err;
      var title = data.match(/<title>(.+)\s-\s無料動画学習｜schoo（スクー）<\/title>/)[1];
      fs.unlinkSync(html);
      callback(title);
    });
  }
};

