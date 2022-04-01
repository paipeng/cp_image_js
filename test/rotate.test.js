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

test.only('rotate 90', () => {
    var rotate = new CPRotate();
    var mat = rotate.rotate(grayMat, 90);

    matUtil.writeBmpMat('./output/rotate_90.bmp', mat);
});


test('rotate 180', () => {
    var rotate = new CPRotate();
    var mat = rotate.rotate(grayMat, 180);

    matUtil.writeBmpMat('./output/rotate_180.bmp', mat);
});


test('rotate 15', () => {
    var rotate = new CPRotate();
    var mat = rotate.rotate(grayMat, 15);

    matUtil.writeBmpMat('./output/rotate_15.bmp', mat);
});


test('rotate 45', () => {
    var rotate = new CPRotate();
    var mat = rotate.rotate(grayMat, 45);

    matUtil.writeBmpMat('./output/rotate_45.bmp', mat);
});


test('rotate 60', () => {
    var rotate = new CPRotate();
    var mat = rotate.rotate(grayMat, 60);

    matUtil.writeBmpMat('./output/rotate_60.bmp', mat);
});



test('rotate 80', () => {
    var rotate = new CPRotate();
    var mat = rotate.rotate(grayMat, 80);

    matUtil.writeBmpMat('./output/rotate_80.bmp', mat);
});

