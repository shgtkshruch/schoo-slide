var spawn = require('child_process').spawn;
var fs = require('fs');

function imagemagic () {};

imagemagic.prototype.convert = function () {
  var convert = spawn('convert', ['*.jpg', '-compress', 'jpeg', 'test.pdf']);

  convert.stdout.on('data', function (dataa) {
    console.log('stdout: ' + data);
  });

  convert.stderr.on('data', function (data) {
    console.log('stferr: ' + data);
  });

  convert.on('close', function (code) {
    console.log('convert jpg images to pdf file.');
  });
}

module.exports = imagemagic;
