
const { matUtil } = require("../lib/mat/cp_matutil");
const imageprocess = require('../lib/imageprocess/cp_imageprocess')



var imageFile = '/Users/paipeng/Downloads/53a0c774-c4bb-4d49-a7a6-a8012065cbeb.bmp'; // error fixed

var grayMat = null;
beforeEach(() => {
    console.log('test image path: ' + imageFile);

    var mat = matUtil.readMat(imageFile);
    grayMat = imageprocess.util().gray(mat);
});

afterEach(() => {

});



test('find contour test', () => {
    //console.log(grayMat);

    var base64 = matUtil.convertJpegBase64(grayMat, 80);
    //console.log('base64', base64);
    expect(base64).not.toBe(null);
});




