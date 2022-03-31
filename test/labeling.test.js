

var log = require("../lib/log/cp_log");
const { matUtil } = require("../lib/mat/cp_matutil");
const imageprocess = require('../lib/imageprocess/cp_imageprocess')

var imagePath = './output';
var grayMat = null;
beforeEach(() => {
    var imageFile = './images/waffle.bmp';
    console.log('test image path: ' + imageFile);

    var mat = matUtil.readMat(imageFile);
    grayMat = imageprocess.util().gray(mat);
});

afterEach(() => {

});

test('labeling test', () => {

    // validate labeling
    var label_index = 100;
    do {
        var blackPoint = imageprocess.util().getCenterPoint(grayMat);
        console.log('blackPoint: ', blackPoint);
        console.log(label_index);

        var labelMat = imageprocess.label(grayMat).label(blackPoint, label_index += 10);
        matUtil.writeBmpMat(imagePath + '/labeling.bmp', labelMat);

        // 6. find contour
        var points = imageprocess.contour(labelMat).findContour();
        var drawMat = imageprocess.draw(grayMat).drawPoints(points, 0);
        matUtil.writeBmpMat(imagePath + '/6_1_detect_contour_points_draw.bmp', drawMat);

        var rectangle = imageprocess.contour(grayMat).getShape(points);
        // get max rectangle shape
        var drawShapeMat = imageprocess.draw(drawMat).drawRectangleOnMat(grayMat, rectangle, 120);
        matUtil.writeBmpMat(imagePath + '/6_2_detect_contour_points_draw_rectangle.bmp', drawShapeMat);
        // get avg rectangle shape
        var avgRectangle = imageprocess.contour(grayMat).getAvgShape(points);
        var drawShapeMat = imageprocess.draw(drawMat).drawRectangleOnMat(drawShapeMat, avgRectangle, 255);
        matUtil.writeBmpMat(imagePath + '/6_3_detect_contour_points_draw_avg_rectangle.bmp', drawShapeMat);

        avgRectangle = rectangle;
        //break;
    } while (label_index <= 200);
    console.log('validated', label_index);
    //matUtil.writeBmpMat(imagePath + '/6_4_detect_after_label.bmp', dilateMat);
});


test.only('labeling.bmp-test', () => {
    var imageFile = './images/labeling.bmp';
    console.log('test image path: ' + imageFile);
    var label_index = 100;

    var mat = matUtil.readMat(imageFile);
    grayMat = imageprocess.util().gray(mat);
    matUtil.writeBmpMat(imagePath + '/labeling_input.bmp', grayMat);

    var blackPoint = imageprocess.util().getCenterPoint(grayMat);
    console.log('blackPoint: ', blackPoint);

    var labelMat = imageprocess.label(grayMat).label(blackPoint, label_index += 250);
    matUtil.writeBmpMat(imagePath + '/labeling.bmp', labelMat);
});


//



