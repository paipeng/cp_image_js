

var log = require("../lib/log/cp_log");
const { matUtil } = require("../lib/mat/cp_matutil");
const imageprocess = require('../lib/imageprocess/cp_imageprocess')




var imagePath = './output';
var imageFile = './images/find_contour.bmp';
var grayMat = null;
beforeEach(() => {
    console.log('test image path: ' + imageFile);

    var mat = matUtil.readMat(imageFile);
    grayMat = imageprocess.util().gray(mat);
});

afterEach(() => {

});



test('find contour test', () => {
    var binaryMat = imageprocess.util().binary(grayMat, 100);

    // 6. find contour
    var points = imageprocess.contour(binaryMat).findContour();
    var drawMat = imageprocess.draw(binaryMat).drawPoints(points, 0);
    matUtil.writeBmpMat(imagePath + '/test_contour_js.bmp', drawMat);

    expect(points.length).toBe(5001);
});



test('detect contour test', () => {
    // 2. resize
    var resize_factor = 0.4;
    var resizeMat = imageprocess.resize(grayMat).resize(parseInt(grayMat.width * resize_factor), parseInt(grayMat.height * resize_factor));
    matUtil.writeBmpMat(imagePath + '/detect_resize.bmp', resizeMat);

    var sharpness = imageprocess.sharpness(resizeMat).SMD();
    console.log("sharpness: " + sharpness);

    // 3. blur filter
    var blurMat = imageprocess.filter(resizeMat).blur(7);
    matUtil.writeBmpMat(imagePath + '/detect_blur.bmp', blurMat);

    sharpness = imageprocess.sharpness(blurMat).SMD();
    console.log("sharpness: " + sharpness);

    // 4. mean
    var mean = imageprocess.util().mean(blurMat);
    log.text.print('mean: ' + mean + '\n');

    // 5. binary
    var binaryMat = imageprocess.util().binary(blurMat, mean * 0.8);
    matUtil.writeBmpMat(imagePath + '/detect_binary.bmp', binaryMat);

    // 5.1 labeling
    var labelMat = imageprocess.label(binaryMat).label({ x: binaryMat.width / 2, y: binaryMat.height / 2 });
    matUtil.writeBmpMat(imagePath + '/label_mat.bmp', labelMat);

    var invertMat = imageprocess.util().invert(labelMat);
    //log.mat.print(invertMat);
    matUtil.writeBmpMat(imagePath + '/invert_mat.bmp', invertMat);

    // 6. find contour
    var points = imageprocess.contour(invertMat).findContour();

    var drawMat = imageprocess.draw(grayMat).drawPoints(points, 0);
    matUtil.writeBmpMat(imagePath + '/detect_contour.bmp', drawMat);

    // get avg rectangle shape
    var avgRectangle = imageprocess.contour(binaryMat).getAvgShape(points);
    var drawShapeMat = imageprocess.draw(drawMat).drawRectangleOnMat(grayMat, avgRectangle, 60);
    matUtil.writeBmpMat(imagePath + '/detect_contour_shape.bmp', drawShapeMat);
});

