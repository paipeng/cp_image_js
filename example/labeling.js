const { matUtil } = require("./mat/cp_matutil");
const { exec } = require("child_process");
var imageProcess = require("./imageprocess/cp_imageprocess");

var imagePath = '/Users/paipeng/Documents/2022_CPDetect/images/debug';
var imageFile = imagePath + '/5_0_detect_binary.bmp'; // error invalid blackPoint

var mat = matUtil.readMat(imageFile);
console.log(mat);

mat = imageProcess.util().binary(mat, 70);
matUtil.writeBmpMat(imagePath + '/test_binary.bmp', mat);


// validate labeling
var label_index = 100;
do {
    var blackPoint = imageProcess.util().getCenterPoint(mat);
    console.log('blackPoint: ', blackPoint);
    console.log(label_index);

    var labelMat = imageProcess.label(mat).label(blackPoint, label_index += 10);
    matUtil.writeBmpMat(imagePath + '/test_labeling.bmp', labelMat);

    // 6. find contour
    var points = imageProcess.contour(labelMat).findContour();
    var drawMat = imageProcess.draw(mat).drawPoints(points, 0);
    matUtil.writeBmpMat(imagePath + '/6_1_detect_contour_points_draw.bmp', drawMat);

    var rectangle = imageProcess.contour(mat).getShape(points);
    // get max rectangle shape
    var drawShapeMat = imageProcess.draw(drawMat).drawRectangleOnMat(mat, rectangle, 120);
    matUtil.writeBmpMat(imagePath + '/6_2_detect_contour_points_draw_rectangle.bmp', drawShapeMat);
    // get avg rectangle shape
    var avgRectangle = imageProcess.contour(mat).getAvgShape(points);
    var drawShapeMat = imageProcess.draw(drawMat).drawRectangleOnMat(drawShapeMat, avgRectangle, 255);
    matUtil.writeBmpMat(imagePath + '/6_3_detect_contour_points_draw_avg_rectangle.bmp', drawShapeMat);

    avgRectangle = rectangle;
    //break;
} while (label_index <= 200);
console.log('validated', label_index);
//matUtil.writeBmpMat('./detect_output/6_4_detect_after_label.bmp', dilateMat);



