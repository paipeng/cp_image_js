//var bmp = require("bmp-js");

var log = require("./log/cp_log");
var bmp = require("./bmp/cp_bmp");
var imageProcess = require("./imageprocess/cp_imageprocess");

//var bmpBuffer = fs.readFileSync();

var imageFile = './test/decoded_image.bmp';
imageFile = './test/37c54c80-b788-4ede-bf27-8f7b26719349-d.bmp';
var mat = bmp.reader(imageFile);


//console.log(mat);


//log.mat.print(mat);


var resizeMat = imageProcess.resize(mat).resize(parseInt(mat.width * 1.4), parseInt(mat.height * 1.4));


//log.mat.print(resizeMat);

bmp.writer('./test/out.bmp', resizeMat);