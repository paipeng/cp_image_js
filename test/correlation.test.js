
var { CPLine, CPPoint, matUtil, imageprocess, CPUtil, CPDraw, CPCorrelation2d } = require("../index");


var grayMat = null;
beforeEach(() => {
    var imageFile = './images/waffle.bmp';
    console.log('test image path: ' + imageFile);

    var mat = matUtil.readMat(imageFile);
    grayMat = imageprocess.util().gray(mat);
});

afterEach(() => {

});

test('correlation float', () => {
    var correlation = new CPCorrelation2d(grayMat);

    var kernel = [1, 0, -1, 1, 0, -1, 1, 0, -1];
    var mat = correlation.filter(kernel, 3);


    console.log(mat);
    //matUtil.writeBmpMat('./output/convex_rgb.bmp', mat);
});



test('correlation uint8', () => {
    var correlation = new CPCorrelation2d(grayMat);

    var kernel = [1, 0, -1, 1, 0, -1, 1, 0, -1];
    var mat = correlation.filterInt(kernel, 3);


    console.log(mat);
    matUtil.writeBmpMat('./output/correlation.bmp', mat);
});


