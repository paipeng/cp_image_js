
var cp_image = require("../index");
var grayMat = null;
beforeEach(() => {
    var imageFile = './images/waffle.bmp';
    console.log('test image path: ' + imageFile);

    var mat = cp_image.matUtil.readMat(imageFile);
    grayMat = cp_image.imageprocess.util().gray(mat);
});

afterEach(() => {

});

test('threshold minimum test', () => {
    var threshold = cp_image.imageprocess.threshold(grayMat).minimum();
    console.log('threshold minimum: ', threshold);
    expect(threshold).toBe(163);
});

test('threshold maxlike test', () => {
    var threshold = cp_image.imageprocess.threshold(grayMat).maxlike();
    console.log('threshold maxlike: ', threshold);
    expect(threshold).toBe(180);
});
