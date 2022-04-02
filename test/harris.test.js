var { matUtil, imageprocess, CPUtil, CPDraw, CPHarrisCorner } = require("../index");


var grayMat = null;
beforeEach(() => {
    var imageFile = './images/find_contour.bmp';
    console.log('test image path: ' + imageFile);

    var mat = matUtil.readMat(imageFile);
    grayMat = imageprocess.util().gray(mat);
});

afterEach(() => {

});



test.only('harris 3', () => {
    var harris = new CPHarrisCorner();
    var mat = harris.findCorners(grayMat, 5);
    matUtil.writeBmpMat('./output/harris_corner.bmp', mat);
});



test('harris 1', () => {
    var harris = new CPHarrisCorner();
    var mat = harris.findCorners(grayMat, 3);
    matUtil.writeBmpMat('./output/harris_corner_1.bmp', mat);
});