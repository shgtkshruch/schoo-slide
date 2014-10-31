var spawn = require('child_process').spawn;
var fs = require('fs');

function imagemagic (title, dir) {
  this.title = title;
  this.dir = dir;
};

imagemagic.prototype.convert = function (cb) {
  var _this = this;
  var pdf = this.title + '.pdf';

  var convert = spawn('convert', [_this.dir + '*.jpg', '-compress', 'jpeg', pdf]);

  convert.stdout.on('data', function (dataa) {
    console.log('stdout: ' + data);
  });

  convert.stderr.on('data', function (data) {
    console.log('stferr: ' + data);
  });

  convert.on('close', function (code) {
    console.log('convert jpg images to pdf file.');
    cb(pdf);
  });
}

module.exports = imagemagic;
