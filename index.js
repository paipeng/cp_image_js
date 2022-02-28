//var bmp = require("bmp-js");

var log = require("./log/cp_log");
var bmp = require("./bmp/cp_bmp");
var imageProcess = require("./imageprocess/cp_imageprocess");

//var bmpBuffer = fs.readFileSync();

var imageFile = './test/decoded_image.bmp';
imageFile = './test/37c54c80-b788-4ede-bf27-8f7b26719349-d.bmp';
imageFile = './test/6fa4ac3e-4ada-46e1-9cdb-34d1af480b09.bmp';
imageFile = './test/e9c6959e-a296-462f-b0e7-38c49a4a67c1.bmp';

var mat = bmp.reader(imageFile);


//console.log(mat);


//log.mat.print(mat);

// 1. resize
var resizeMat = imageProcess.resize(mat).resize(parseInt(mat.width * 0.4), parseInt(mat.height * 0.4));
bmp.writer('./test/out_resize.bmp', resizeMat);
// 2. crop
var cropMat = imageProcess.crop(mat).crop(30, 30, 160, 160);
bmp.writer('./test/out_crop.bmp', cropMat);


// 3. blur filter

var blurMat = imageProcess.filter(resizeMat).blur(9);
bmp.writer('./test/out_blur.bmp', blurMat);

// 4. mean
var mean = imageProcess.util().mean(blurMat);
log.text.print('mean: ' + mean);


// 5. binary
var binaryMat = imageProcess.util().binary(blurMat, mean);
bmp.writer('./test/out_binary.bmp', binaryMat);

// 6. find contour
var points = imageProcess.contour(binaryMat).findContour();
var drawMat = imageProcess.draw(binaryMat).drawPoints(points, 0);
bmp.writer('./test/out_contour_points_draw.bmp', drawMat);



//log.mat.print(resizeMat);
