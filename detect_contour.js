
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

var invertMat = imageProcess.util().invert(binaryMat);
//log.mat.print(invertMat);
bmp.writer('./output/invert_mat.bmp', invertMat);



// 5.1 labeling
var labelMat = imageProcess.label(binaryMat).label({ x: binaryMat.width / 2, y: binaryMat.height / 2 });
bmp.writer('./output/label_mat.bmp', labelMat);

// 6. find contour
var points = imageProcess.contour(labelMat).findContour();
var drawMat = imageProcess.draw(binaryMat).drawPoints(points, 0);
bmp.writer('./output/detect_contour_points_draw.bmp', drawMat);