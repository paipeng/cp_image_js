
var { CPLine, CPPoint, matUtil, imageprocess, CPUtil, CPDraw, CPFlip } = require("../index");


var grayMat = null;
beforeEach(() => {
    var imageFile = './images/waffle.bmp';
    console.log('test image path: ' + imageFile);

    var mat = matUtil.readMat(imageFile);
    grayMat = imageprocess.util().gray(mat);
});

afterEach(() => {

});

test('flip horizontal', () => {
    var flip = new CPFlip();

    flip.horizontal(grayMat);

    matUtil.writeBmpMat('./output/flip_horizontal.bmp', grayMat);
});


test('flip vertical', () => {
    var flip = new CPFlip();

    flip.vertical(grayMat);

    matUtil.writeBmpMat('./output/flip_vertical.bmp', grayMat);
});


