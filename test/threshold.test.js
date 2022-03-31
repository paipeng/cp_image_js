
var log = require("../lib/log/cp_log");
const { matUtil } = require("../lib/mat/cp_matutil");
const imageprocess = require('../lib/imageprocess/cp_imageprocess')



var grayMat = null;
beforeEach(() => {
    var imageFile = './images/waffle.bmp';
    console.log('test image path: ' + imageFile);

    var mat = matUtil.readMat(imageFile);
    grayMat = imageprocess.util().gray(mat);
});

afterEach(() => {

});

test('threshold minimum test', () => {
    var threshold = imageprocess.threshold(grayMat).minimum();
    console.log('threshold minimum: ', threshold);
    expect(threshold).toBe(163);
});

test('threshold maxlike test', () => {
    var threshold = imageprocess.threshold(grayMat).maxlike();
    console.log('threshold maxlike: ', threshold);
    expect(threshold).toBe(180);
});
