
var cp_image = require("../index");

var imagePath = './output';
var grayMat = null;
beforeEach(() => {
    var imageFile = './images/waffle.bmp';
    console.log('test image path: ' + imageFile);

    var mat = cp_image.matUtil.readMat(imageFile);
    grayMat = cp_image.imageprocess.util().gray(mat);
});

afterEach(() => {

});

test('labeling test', () => {

    // validate labeling
    var label_index = 100;
    do {
        var blackPoint = cp_image.imageprocess.util().getCenterPoint(grayMat);
        console.log('blackPoint: ', blackPoint);
        console.log(label_index);

        var labelMat = cp_image.imageprocess.label(grayMat).label(blackPoint, label_index += 10);
        cp_image.matUtil.writeBmpMat(imagePath + '/labeling.bmp', labelMat);

        // 6. find contour
        var points = cp_image.imageprocess.contour(labelMat).findContour();
        var drawMat = cp_image.imageprocess.draw(grayMat).drawPoints(points, 0);
        cp_image.matUtil.writeBmpMat(imagePath + '/6_1_detect_contour_points_draw.bmp', drawMat);

        var rectangle = cp_image.imageprocess.contour(grayMat).getShape(points);
        // get max rectangle shape
        var drawShapeMat = cp_image.imageprocess.draw(drawMat).drawRectangleOnMat(grayMat, rectangle, 120);
        cp_image.matUtil.writeBmpMat(imagePath + '/6_2_detect_contour_points_draw_rectangle.bmp', drawShapeMat);
        // get avg rectangle shape
        var avgRectangle = cp_image.imageprocess.contour(grayMat).getAvgShape(points);
        var drawShapeMat = cp_image.imageprocess.draw(drawMat).drawRectangleOnMat(drawShapeMat, avgRectangle, 255);
        cp_image.matUtil.writeBmpMat(imagePath + '/6_3_detect_contour_points_draw_avg_rectangle.bmp', drawShapeMat);

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

    var mat = cp_image.matUtil.readMat(imageFile);
    grayMat = cp_image.imageprocess.util().gray(mat);
    cp_image.matUtil.writeBmpMat(imagePath + '/labeling_input.bmp', grayMat);

    var blackPoint = cp_image.imageprocess.util().getCenterPoint(grayMat);
    console.log('blackPoint: ', blackPoint);

    var labelMat = cp_image.imageprocess.label(grayMat).label(blackPoint, label_index += 250);
    cp_image.matUtil.writeBmpMat(imagePath + '/labeling.bmp', labelMat);
});


//



