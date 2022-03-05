
var log = require("./log/cp_log");
var bmp = require("./bmp/cp_bmp");
var imageProcess = require("./imageprocess/cp_imageprocess");

var imageFile = './test/detect_erosion.bmp';
imageFile = './output/06b1be8c-0ef5-4cc7-8817-478cf2f67b75.bmp';

var mat = bmp.reader(imageFile);
log.text.print('mat size: ' + mat.width + '-' + mat.height + ' // ' + mat.channel + '\n');


// 2. resize
var resize_factor = 0.4;
var resizeMat = imageProcess.resize(mat).resize(parseInt(mat.width * resize_factor), parseInt(mat.height * resize_factor));
bmp.writer('./output/detect_resize.bmp', resizeMat);





var sharpness = imageProcess.sharpness(resizeMat).SMD();
console.log("sharpness: " + sharpness);

// 3. blur filter
var blurMat = imageProcess.filter(resizeMat).blur(7);
bmp.writer('./output/detect_blur.bmp', blurMat);

sharpness = imageProcess.sharpness(blurMat).SMD();
console.log("sharpness: " + sharpness);



// 4. mean
var mean = imageProcess.util().mean(blurMat);
log.text.print('mean: ' + mean + '\n');

// 5. binary
var binaryMat = imageProcess.util().binary(blurMat, mean * 0.8);
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
