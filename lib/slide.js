var https = require('https');
var fs = require('fs');
var async = require('async');

function slide() {
  this.downloading = true;
  this.i = 0;
}

slide.prototype.download = function (cb) {
  var _this = this;
  async.whilst(
    function () {
      return _this.downloading;
    },
    function (callback) {
      _this.i++;
      _this.getImage(_this.i, callback);
    },
    function () {
      console.log('all slide downloaded.');
      fs.unlinkSync(_this.fixNum(_this.i, 3) + '.jpg');
      cb();
    }
  );
}

slide.prototype.getImage = function (slideNum, callback) {
  var _this = this;
  var url = 'https://s3-ap-northeast-1.amazonaws.com/i.schoo/images/class/slide/';
  var classNum = process.argv[2] + '/';
  var ext = '-1024.jpg';
  var f = fs.createWriteStream(_this.fixNum(slideNum, 3) + '.jpg');

  https.get(url + classNum + slideNum + ext, function (res) {
    res.on('data', function (chunk) {
      f.write(chunk);
    });

    res.on('end', function () {
      f.end();
      if (res.statusCode !== 200) {
        _this.downloading = false;
      }
      callback();
    });
  });
}

slide.prototype.fixNum = function (num, figures) {
  var str = num.toString();
  while (str.length < figures) {
    str = '0' + str;
  }
  return str;
}

module.exports = slide;
