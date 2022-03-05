
var log = require("./log/cp_log");
var bmp = require("./bmp/cp_bmp");
var imageProcess = require("./imageprocess/cp_imageprocess");

var imageFile = './test/detect_erosion.bmp';

var mat = bmp.reader(imageFile);

// 4. mean
var mean = imageProcess.util().mean(mat);
log.text.print('mean: ' + mean + '\n');

// 5. binary
var binaryMat = imageProcess.util().binary(mat, mean * 0.8);
bmp.writer('./output/detect_binary.bmp', binaryMat);



// 5.1 labeling
var labelMat = imageProcess.label(binaryMat).label({ x: binaryMat.width / 2, y: binaryMat.height / 2 });
bmp.writer('./output/label_mat.bmp', labelMat);

var invertMat = imageProcess.util().invert(labelMat);
//log.mat.print(invertMat);
bmp.writer('./output/invert_mat.bmp', invertMat);



// 6. find contour
var points = imageProcess.contour(invertMat).findContour();

var drawMat = imageProcess.draw(mat).drawPoints(points, 0);
bmp.writer('./output/detect_contour.bmp', drawMat);

// get avg rectangle shape
var avgRectangle = imageProcess.contour(binaryMat).getAvgShape(points);
var drawShapeMat = imageProcess.draw(drawMat).drawRectangleOnMat(mat, avgRectangle, 60);
bmp.writer('./output/detect_contour_shape.bmp', drawShapeMat);
