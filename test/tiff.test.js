
var fs = require('fs');
var { decode } = require('tiff');
var cp_image = require("../index");

var imageFile = './images/unesco-logo.tif';


var grayMat = null;
beforeEach(() => {
    console.log('test image path: ' + imageFile);

});

afterEach(() => {

});


test('read tiff image', () => {
    var tiff_data = fs.readFileSync(imageFile);
    console.log(tiff_data);
    const [mat] = decode(tiff_data);
    console.log(mat.width);
    console.log(mat.height);
    console.log(mat.components);
    expect(mat.width).toBe(138);
    expect(mat.height).toBe(98);
    expect(mat.components).toBe(3);
});




test('read tiff image via cp_image', () => {
    var mat = cp_image.matUtil.readMat(imageFile);
    console.log(mat.width);
    console.log(mat.height);
    console.log(mat.channel);
    expect(mat.width).toBe(138);
    expect(mat.height).toBe(98);
    expect(mat.channel).toBe(3);
});


