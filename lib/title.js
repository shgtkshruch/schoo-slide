var http = require('http');
var fs = require('fs');

module.exports = function (classNum, callback) {
  var url = 'http://schoo.jp/class/' + classNum;
  var html = './title.html';

  var f = fs.createWriteStream(html);

  http.get(url, function (res) {
    res.on('data', function (chunk) {
      f.write(chunk);
    });

    res.on('end', function () {
      f.end();
      getTitle();
    });
  });

  function getTitle (cb) {
    fs.readFile(html, {encoding: 'utf-8'}, function (err, data) {
      if (err) {
        throw err;
      }
      var title = data.split('<title>')[1].split('<\/title>')[0].split('先生')[0] + '先生';
      fs.unlinkSync(html);
      callback(title);
    });
  }
}

