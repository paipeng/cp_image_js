
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

imageFile = '/Users/paipeng/Downloads/ead2a878-9c6d-4429-8ea4-d34b4fa301c5.jpeg'; // OK
imageFile = '/Users/paipeng/Downloads/0f39aea2-2b2e-424a-ba50-20e437a4240c.jpeg'; // OK
imageFile = '/Users/paipeng/Downloads/989ba123-3fc0-4e86-b406-896e6182e3d6.jpeg'; // OK
imageFile = '/Users/paipeng/Downloads/a2ceef2e-e2b9-456c-bad8-e62f029532ba.jpeg'; // OK

imageFile = '/Users/paipeng/Downloads/51832a39-edc1-4114-b767-ecd940858dca.jpeg'; // error
imageFile = '/Users/paipeng/Downloads/e3096336-cda4-4fdf-a9fa-4eb7bd9ff10c.jpeg'; // error crop -> 0.4
imageFile = '/Users/paipeng/Downloads/d47005e3-d3a2-4c9e-a897-a84d597a9fc0.jpeg'; // error



var jpegData = fs.readFileSync(imageFile);

var mat = jpeg.decode(jpegData);
mat.channel = mat.data.length / (mat.width * mat.height);
//console.log(mat);


var result = cpDetect(mat).detect({
    crop_factor: 0.8,
    resize_width: 640,
    resize_height: 640,
    code_width: 432,
    code_height: 360,
    min_sharpness: 20
});

console.log(result);

// console.log(mat);

