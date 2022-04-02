var { matUtil, imageprocess, CPUtil, CPDraw, CPFFT } = require("../index");


var grayMat = null;
beforeEach(() => {
    var imageFile = './images/find_contour.bmp';
    console.log('test image path: ' + imageFile);

    var mat = matUtil.readMat(imageFile);
    grayMat = imageprocess.util().gray(mat);
});

afterEach(() => {

});



test.only('fft 1d', () => {
    var fft = new CPFFT();

    var points = [];
    points.push(10);
    points.push(1);
    points.push(3);
    points.push(5);
    points.push(8);
    points.push(9);
    points.push(9);
    points.push(9);

    points = fft.convertToCPComplexArray(points);
    console.log(points);

    complexs = fft.fft1(points);
    console.log(complexs);


    complexs2 = fft.ifft1(complexs);
    console.log(complexs2);

});
