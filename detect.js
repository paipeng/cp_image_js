
var log = require("./log/cp_log");
var bmp = require("./bmp/cp_bmp");
var imageProcess = require("./imageprocess/cp_imageprocess");
var cpDetect = require('./detect/cp_detect.js');

var imageFile = './test/b3954792-590a-44b6-8ce6-cc69b948b5f2.bmp';
imageFile = './output/06b1be8c-0ef5-4cc7-8817-478cf2f67b75.bmp';

var mat = bmp.reader(imageFile);

cpDetect(mat).detect({
    crop_factor: 0.8,
    resizeWidth: 640,
    resizeHeight: 640
});

// console.log(mat);

