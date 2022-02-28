
var log = require("./log/cp_log");
var bmp = require("./bmp/cp_bmp");
var imageProcess = require("./imageprocess/cp_imageprocess");

var imageFile = './test/b3954792-590a-44b6-8ce6-cc69b948b5f2.bmp';

var mat = bmp.reader(imageFile);


// console.log(mat);
// 1. crop 60%
var crop_factor = 0.6;
var crop_offset_x = mat.width * ((1 - crop_factor) / 2);
var crop_offset_y = mat.height * ((1 - crop_factor) / 2);
var cropMat = imageProcess.crop(mat).crop(parseInt(crop_offset_x), parseInt(crop_offset_y), parseInt(mat.width * crop_factor), parseInt(mat.height * crop_factor));
bmp.writer('./test/detect_crop.bmp', cropMat);


// 2. resize
var resize_factor = 0.4;
var resizeMat = imageProcess.resize(cropMat).resize(parseInt(cropMat.width * resize_factor), parseInt(cropMat.height * resize_factor));
bmp.writer('./test/detect_resize.bmp', resizeMat);


// 3. blur filter
var blurMat = imageProcess.filter(resizeMat).blur(7);
bmp.writer('./test/detect_blur.bmp', blurMat);

// 4. mean
var mean = imageProcess.util().mean(blurMat);
log.text.print('mean: ' + mean + '\n');

// 4-2 improve contrast
var contrastMat = imageProcess.contrast(blurMat).improve(mean * 0.8, 1.1);
bmp.writer('./test/detect_contrast.bmp', contrastMat);

// 5. binary
var binaryMat = imageProcess.util().binary(contrastMat, mean * 0.8);
bmp.writer('./test/detect_binary.bmp', binaryMat);

// 6. find contour
var points = imageProcess.contour(binaryMat).findContour();
var drawMat = imageProcess.draw(binaryMat).drawPoints(points, 0);
bmp.writer('./test/detect_contour_points_draw.bmp', drawMat);

var rectangle = imageProcess.contour(binaryMat).getShape(points);
// get max rectangle shape
var drawShapeMat = imageProcess.draw(drawMat).drawRectangleOnMat(drawMat, rectangle, 120);
bmp.writer('./test/detect_contour_points_draw_rectangle.bmp', drawShapeMat);
// get avg rectangle shape
var avgRectangle = imageProcess.contour(binaryMat).getAvgShape(points);
var drawShapeMat = imageProcess.draw(drawMat).drawRectangleOnMat(drawShapeMat, avgRectangle, 60);
bmp.writer('./test/detect_contour_points_draw_avg_rectangle.bmp', drawShapeMat);

// 7. check size validation -> recrop /resize -> convert to bmp base64 string
//log.mat.print(resizeMat);
