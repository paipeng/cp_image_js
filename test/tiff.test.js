
var fs = require('fs');
var { decode } = require('tiff');


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
    const [result] = decode(tiff_data);
    console.log(result.width);
    console.log(result.height);
    console.log(result.components);
});




