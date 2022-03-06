
var log = require("./log/cp_log");
var bmp = require("./bmp/cp_bmp");
var jpeg = require('jpeg-js');
var fs = require("fs");
var imageProcess = require("./imageprocess/cp_imageprocess");
var cpDetect = require('./detect/cp_detect.js');

var imageFile = './test/b3954792-590a-44b6-8ce6-cc69b948b5f2.bmp';
imageFile = './output/06b1be8c-0ef5-4cc7-8817-478cf2f67b75.bmp';

//imageFile = './detect_output/3fdd2432-f178-4c61-a991-cf789ef35091.bmp';

//imageFile = './detect_output/53a0c774-c4bb-4d49-a7a6-a8012065cbeb.bmp';

//var mat = bmp.reader(imageFile);

var jpegData = fs.readFileSync('/Users/paipeng/Downloads/ead2a878-9c6d-4429-8ea4-d34b4fa301c5.jpeg');
var mat = jpeg.decode(jpegData);
mat.channel = mat.data.length / (mat.width * mat.height);
//console.log(mat);


var result = cpDetect(mat).detect({
    crop_factor: 0.8,
    resize_width: 640,
    resize_height: 640,
    min_sharpness: 20
});

console.log(result);

// console.log(mat);

