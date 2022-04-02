var { matUtil, imageprocess, CPUtil, CPDraw, CPHarrisCorner } = require("../index");


var grayMat = null;
beforeEach(() => {
    var imageFile = './images/waffle.bmp';
    console.log('test image path: ' + imageFile);

    var mat = matUtil.readMat(imageFile);
    grayMat = imageprocess.util().gray(mat);
});

afterEach(() => {

});



test('rotate 90', () => {
    var harris = new CPHarrisCorner();
    var mat = harris.findCorners(grayMat, 3);

    matUtil.writeBmpMat('./output/harris_corner.bmp', mat);
});