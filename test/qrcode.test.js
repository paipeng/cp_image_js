var cp_image = require("../index");

var grayMat = null;
beforeEach(() => {
    var imageFile = './images/qrcode.bmp';
    console.log('test image path: ' + imageFile);

    var mat = cp_image.matUtil.readMat(imageFile);
    grayMat = cp_image.imageprocess.util().gray(mat);
});

afterEach(() => {

});


test('qrcode test', () => {
    // 2. resize
    var resize_factor = 0.2;
    var resizeMat = cp_image.imageprocess.resize(grayMat).resizeFactor(resize_factor);
    cp_image.matUtil.writeBmpMat('./output/detect_resize.bmp', resizeMat);
    // blur
    var blurMat = cp_image.imageprocess.filter(resizeMat).blur(5);
    cp_image.matUtil.writeBmpMat('./output/detect_blur.bmp', blurMat);

    // 2.1 contrast
    var contrastMat = cp_image.imageprocess.contrast().improve3(blurMat, 12.1);
    cp_image.matUtil.writeBmpMat('./output/detect_contrast.bmp', contrastMat);

    // mean
    var mean = cp_image.imageprocess.util().mean(resizeMat);
    console.log('mean: ', mean)

    var maxlike = cp_image.imageprocess.threshold(resizeMat).maxlike();
    console.log('maxlike: ', maxlike)


    var binaryMat = cp_image.imageprocess.util().binary(contrastMat, mean);
    cp_image.matUtil.writeBmpMat('./output/detect_binary.bmp', binaryMat);



    /*
    contrastMat = imageprocess.contrast().linearStretch(blurMat, maxlike, mean);
    matUtil.writeBmpMat('./output/detect_contrast_liniear_stretch.bmp', contrastMat);

    invertMat = imageprocess.util().invert(contrastMat);
    matUtil.writeBmpMat('./output/detect_invert.bmp', invertMat);


    contrastMat = imageprocess.contrast().improve2(blurMat, 1.8, 20.4);
    matUtil.writeBmpMat('./output/detect_contrast2.bmp', contrastMat);


    contrastMat = imageprocess.contrast().improve3(blurMat, 12.1);
    matUtil.writeBmpMat('./output/detect_contrast3.bmp', contrastMat);


    blurMat = imageprocess.filter(contrastMat).blur(7);
    matUtil.writeBmpMat('./output/detect_blur3.bmp', blurMat);


    contrastMat = imageprocess.contrast().improve3(blurMat, 32.1);
    matUtil.writeBmpMat('./output/detect_contrast3-1.bmp', contrastMat);


    //expect(imageprocess.convexHull().add(1, 2)).toBe(3);
    */
});