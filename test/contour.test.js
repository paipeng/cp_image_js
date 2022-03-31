

var cp_image = require("../index")


var imagePath = './output';
var imageFile = './images/find_contour.bmp';
var grayMat = null;
beforeEach(() => {
    console.log('test image path: ' + imageFile);

    var mat = cp_image.matUtil.readMat(imageFile);
    grayMat = cp_image.imageprocess.util().gray(mat);
});

afterEach(() => {

});



test('find contour test', () => {
    var binaryMat = cp_image.imageprocess.util().binary(grayMat, 100);

    // 6. find contour
    var points = cp_image.imageprocess.contour(binaryMat).findContour();
    var drawMat = cp_image.imageprocess.draw(binaryMat).drawPoints(points, 0);
    cp_image.matUtil.writeBmpMat(imagePath + '/test_contour_js.bmp', drawMat);

    expect(points.length).toBe(5001);
});



test('detect contour test', () => {
    // 2. resize
    var resize_factor = 0.4;
    var resizeMat = cp_image.imageprocess.resize(grayMat).resize(parseInt(grayMat.width * resize_factor), parseInt(grayMat.height * resize_factor));
    cp_image.matUtil.writeBmpMat(imagePath + '/detect_resize.bmp', resizeMat);

    var sharpness = cp_image.imageprocess.sharpness(resizeMat).SMD();
    console.log("sharpness: " + sharpness);

    // 3. blur filter
    var blurMat = cp_image.imageprocess.filter(resizeMat).blur(7);
    cp_image.matUtil.writeBmpMat(imagePath + '/detect_blur.bmp', blurMat);

    sharpness = cp_image.imageprocess.sharpness(blurMat).SMD();
    console.log("sharpness: " + sharpness);

    // 4. mean
    var mean = cp_image.imageprocess.util().mean(blurMat);
    cp_image.log.text.print('mean: ' + mean + '\n');

    // 5. binary
    var binaryMat = cp_image.imageprocess.util().binary(blurMat, mean * 0.8);
    cp_image.matUtil.writeBmpMat(imagePath + '/detect_binary.bmp', binaryMat);

    // 5.1 labeling
    var labelMat = cp_image.imageprocess.label(binaryMat).label({ x: binaryMat.width / 2, y: binaryMat.height / 2 });
    cp_image.matUtil.writeBmpMat(imagePath + '/label_mat.bmp', labelMat);

    var invertMat = cp_image.imageprocess.util().invert(labelMat);
    //log.mat.print(invertMat);
    cp_image.matUtil.writeBmpMat(imagePath + '/invert_mat.bmp', invertMat);

    // 6. find contour
    var points = cp_image.imageprocess.contour(invertMat).findContour();

    var drawMat = cp_image.imageprocess.draw(grayMat).drawPoints(points, 0);
    cp_image.matUtil.writeBmpMat(imagePath + '/detect_contour.bmp', drawMat);

    // get avg rectangle shape
    var avgRectangle = cp_image.imageprocess.contour(binaryMat).getAvgShape(points);
    var drawShapeMat = cp_image.imageprocess.draw(drawMat).drawRectangleOnMat(grayMat, avgRectangle, 60);
    cp_image.matUtil.writeBmpMat(imagePath + '/detect_contour_shape.bmp', drawShapeMat);
});

