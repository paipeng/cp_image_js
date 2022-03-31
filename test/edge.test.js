
var cp_image = require("../index");

/*
console.log(process.argv);
if (process.argv.length <= 2) {
    console.error('usage: node edge.js image_path');
    exit();
}
*/
var grayMat = null;
beforeEach(() => {
    var imageFile = './images/waffle.bmp';
    console.log('test image path: ' + imageFile);

    var mat = cp_image.matUtil.readMat(imageFile);
    grayMat = cp_image.imageprocess.util().gray(mat);
});

afterEach(() => {

});

// 2. resize
//var resize_factor = 0.4;
//var resizeMat = imageProcess.resize(grayMat).resizeFactor(resize_factor);
//matUtil.writeBmpMat('/Users/paipeng/Downloads/detect_resize.bmp', resizeMat);



test('filter blur test', () => {
    var blurMat = cp_image.imageprocess.filter(grayMat).blur(5);
    cp_image.matUtil.writeBmpMat('./output/detect_blur.bmp', blurMat);
    var mean = cp_image.imageprocess.util().mean(blurMat);
    console.log('mean: ', mean)
    expect(parseInt(mean)).toBe(140);
    var maxlike = cp_image.imageprocess.threshold(blurMat).maxlike();
    console.log('maxlike: ', maxlike)
    expect(maxlike).toBe(174);
});

test('edge sobel test', () => {
    var edgeMat = cp_image.imageprocess.cpcanny(grayMat).gradient('sobel');
    cp_image.matUtil.writeBmpMat('./output/detect_edge_sobel.bmp', edgeMat);
});

test('edge roberts test', () => {
    var edgeMat = cp_image.imageprocess.cpcanny(grayMat).gradient('roberts');
    cp_image.matUtil.writeBmpMat('./output/detect_edge_roberts.bmp', edgeMat);
});

test('edge prewitt test', () => {
    var edgeMat = cp_image.imageprocess.cpcanny(grayMat).gradient('prewitt');
    cp_image.matUtil.writeBmpMat('./output/detect_edge_prewitt.bmp', edgeMat);
});
