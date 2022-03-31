
var cp_image = require("../index")



var grayMat = null;
beforeEach(() => {
    var imageFile = './images/waffle.bmp';
    console.log('test image path: ' + imageFile);

    var mat = cp_image.matUtil.readMat(imageFile);
    grayMat = cp_image.imageprocess.util().gray(mat);
});

afterEach(() => {

});

test('contrast test', () => {
    // 2. resize
    var resize_factor = 0.4;
    var resizeMat = cp_image.imageprocess.resize(grayMat).resizeFactor(resize_factor);
    cp_image.matUtil.writeBmpMat('./output/detect_resize.bmp', resizeMat);

    // 2.1 contrast
    var contrastMat = cp_image.imageprocess.contrast().improve3(resizeMat, 12.1);
    cp_image.matUtil.writeBmpMat('./output/detect_contrast.bmp', contrastMat);

    // 4. mean
    var mean = cp_image.imageprocess.util().mean(resizeMat);
    console.log('mean: ', mean)
    expect(parseInt(mean)).toBe(141);
    var maxlike = cp_image.imageprocess.threshold(resizeMat).maxlike();
    console.log('maxlike: ', maxlike)
    expect(maxlike).toBe(177);

    contrastMat = cp_image.imageprocess.contrast().linearStretch(resizeMat, maxlike, mean);
    cp_image.matUtil.writeBmpMat('./output/detect_contrast_liniear_stretch.bmp', contrastMat);
    expect(cp_image.imageprocess.convexHull().add(1, 2)).toBe(3);
});





