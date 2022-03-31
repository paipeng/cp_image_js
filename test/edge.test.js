

var log = require("../lib/log/cp_log");
const { matUtil } = require("../lib/mat/cp_matutil");
const imageprocess = require('../lib/imageprocess/cp_imageprocess')


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

    var mat = matUtil.readMat(imageFile);
    grayMat = imageprocess.util().gray(mat);
});

afterEach(() => {

});

// 2. resize
//var resize_factor = 0.4;
//var resizeMat = imageProcess.resize(grayMat).resizeFactor(resize_factor);
//matUtil.writeBmpMat('/Users/paipeng/Downloads/detect_resize.bmp', resizeMat);



test('filter blur test', () => {
    var blurMat = imageprocess.filter(grayMat).blur(5);
    matUtil.writeBmpMat('./output/detect_blur.bmp', blurMat);
    var mean = imageprocess.util().mean(blurMat);
    console.log('mean: ', mean)
    expect(parseInt(mean)).toBe(140);
    var maxlike = imageprocess.threshold(blurMat).maxlike();
    console.log('maxlike: ', maxlike)
    expect(maxlike).toBe(174);
});

test('edge sobel test', () => {
    var edgeMat = imageprocess.cpcanny(grayMat).gradient('sobel');
    matUtil.writeBmpMat('./output/detect_edge_sobel.bmp', edgeMat);
});

test('edge roberts test', () => {
    var edgeMat = imageprocess.cpcanny(grayMat).gradient('roberts');
    matUtil.writeBmpMat('./output/detect_edge_roberts.bmp', edgeMat);
});

test('edge prewitt test', () => {
    var edgeMat = imageprocess.cpcanny(grayMat).gradient('prewitt');
    matUtil.writeBmpMat('./output/detect_edge_prewitt.bmp', edgeMat);
});
