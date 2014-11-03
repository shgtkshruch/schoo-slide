var spawn = require('child_process').spawn;
var fs = require('fs');

module.exports = function (title, dir, cb) {
  var pdf = title + '.pdf';

  var convert = spawn('convert', [dir + '*.jpg', '-compress', 'jpeg', pdf]);

  convert.stdout.on('data', function (data) {
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
