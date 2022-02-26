//var bmp = require("bmp-js");

var log = require("./log/cp_log");
var bmp = require("./bmp/cp_bmp");

//var bmpBuffer = fs.readFileSync();
var bmpData = bmp.reader('decoded_image.bmp');

console.log(bmpData);


log.mat.print(bmpData);