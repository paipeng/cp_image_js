var { matUtil, imageprocess, CPUtil, CPDraw, CPFFT } = require("../index");


var grayMat = null;
var fft = null;
beforeEach(() => {
    fft = new CPFFT();
    var imageFile = './images/find_contour.bmp';
    console.log('test image path: ' + imageFile);

    var mat = matUtil.readMat(imageFile);
    grayMat = imageprocess.util().gray(mat);
});

afterEach(() => {

});



test('fft 1d', () => {
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




test.only('fft2', () => {
    var points = [];
    points.push([1, 2, 3, 4, 5, 6, 7, 8]);
    points.push([8, 7, 6, 5, 4, 3, 2, 1]);
    points.push([5, 6, 7, 8, 1, 2, 3, 4]);
    points.push([1, 2, 3, 4, 8, 7, 6, 5]);
    points.push([2, 2, 3, 4, 8, 7, 6, 5]);
    points.push([3, 2, 3, 4, 8, 7, 6, 5]);
    points.push([4, 2, 3, 4, 8, 7, 6, 5]);
    points.push([5, 2, 3, 4, 8, 7, 6, 5]);



    points = [];
    points.push([1, 2, 3, 4]);
    points.push([4, 3, 2, 1]);
    points.push([5, 6, 7, 8]);
    points.push([9, 7, 5, 3]);

    console.log(points[2][1]);
    console.log(points[0].length);
    points = fft.convertToCPComplexArray2D(points);
    console.log(points[0].length);


    for (var i = 0; i < points.length; i++) {
        console.log(points[i]);
    }

    complexs = fft.fft2(points);
    console.log(complexs)


    complexs2 = fft.ifft2(complexs);

    console.log(complexs2)
});