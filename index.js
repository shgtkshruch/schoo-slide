var https = require('https');
var fs = require('fs');

function getImage (slideNum, cb) {
  var url = 'https://s3-ap-northeast-1.amazonaws.com/i.schoo/images/class/slide/';
  var classNum = process.argv[2] + '/';
  var ext = '-1024.jpg';
  var f = fs.createWriteStream(slideNum + '.jpg');

  https.get(url + classNum + slideNum + ext, function (res) {
    res.on('data', function (chunk) {
      f.write(chunk);
    });

    res.on('end', function () {
      f.end();
      if (res.statusCode !== 200) cb(slideNum);
    });
  });
}

for (var i = 1; i < 20; i++) {
  getImage(i, function (j) {
    console.log('all slide downloaded.');
    fs.unlinkSync(j + '.jpg');
  });
}

