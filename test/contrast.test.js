

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

test('contrast test', () => {
    // 2. resize
    var resize_factor = 0.4;
    var resizeMat = imageprocess.resize(grayMat).resizeFactor(resize_factor);
    matUtil.writeBmpMat('./output/detect_resize.bmp', resizeMat);

    // 2.1 contrast
    var contrastMat = imageprocess.contrast().improve3(resizeMat, 12.1);
    matUtil.writeBmpMat('./output/detect_contrast.bmp', contrastMat);

    // 4. mean
    var mean = imageprocess.util().mean(resizeMat);
    console.log('mean: ', mean)
    expect(parseInt(mean)).toBe(141);
    var maxlike = imageprocess.threshold(resizeMat).maxlike();
    console.log('maxlike: ', maxlike)
    expect(maxlike).toBe(177);

    contrastMat = imageprocess.contrast().linearStretch(resizeMat, maxlike, mean);
    matUtil.writeBmpMat('./output/detect_contrast_liniear_stretch.bmp', contrastMat);
    expect(imageprocess.convexHull().add(1, 2)).toBe(3);
});





