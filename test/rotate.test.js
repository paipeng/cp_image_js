var { matUtil, imageprocess, CPUtil, CPDraw, CPRotate } = require("../index");


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
    var rotate = new CPRotate();
    var mat = rotate.rotate(grayMat, 90);

    matUtil.writeBmpMat('./output/rotate_90.bmp', mat);
});


test('rotate 180', () => {
    var rotate = new CPRotate();
    var mat = rotate.rotate(grayMat, 180);

    matUtil.writeBmpMat('./output/rotate_180.bmp', mat);
});


test('rotate 45', () => {
    var rotate = new CPRotate();
    var mat = rotate.rotate(grayMat, 45);

    matUtil.writeBmpMat('./output/rotate_45.bmp', mat);
});

