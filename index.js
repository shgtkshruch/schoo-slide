var Slide = require('./lib/slide');
var Imagemagic = require('./lib/imagemagic');

var slide = new Slide();
var imagemagic = new Imagemagic();

slide.download(function () {
  imagemagic.convert();
});
