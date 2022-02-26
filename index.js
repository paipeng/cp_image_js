//var bmp = require("bmp-js");

var log = require("./log/cp_log");
var bmp = require("./bmp/cp_bmp");
var imageProcess = require("./imageprocess/cp_imageprocess");

//var bmpBuffer = fs.readFileSync();
var mat = bmp.reader('decoded_image.bmp');

console.log(mat);


log.mat.print(mat);


var resizeMat = imageProcess.resize(mat).resize(42, 42);


//log.mat.print(resizeMat);

bmp.writer('out.bmp', resizeMat);