var https = require('https');
var fs = require('fs');
var async = require('async');

var downloading = true;
var i = 0;

async.whilst(
  function () {
    return downloading;
  },
  function (callback) {
    i++;
    getImage(i, callback);
  },
  function () {
    console.log('all slide downloaded.');
    fs.unlinkSync(fixNum(i, 3) + '.jpg');
  }
);

function getImage (slideNum, callback) {
  var url = 'https://s3-ap-northeast-1.amazonaws.com/i.schoo/images/class/slide/';
  var classNum = process.argv[2] + '/';
  var ext = '-1024.jpg';
  var f = fs.createWriteStream(fixNum(slideNum, 3) + '.jpg');

  https.get(url + classNum + slideNum + ext, function (res) {
    res.on('data', function (chunk) {
      f.write(chunk);
    });

    res.on('end', function () {
      f.end();
      if (res.statusCode !== 200) {
        downloading = false;
      }
      callback();
    });
  });
}

function fixNum (num, figures) {
  var str = num.toString();
  while (str.length < figures) {
    str = '0' + str;
  }
  return str;
}
