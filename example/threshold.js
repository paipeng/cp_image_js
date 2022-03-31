const { matUtil } = require("./mat/cp_matutil");
const { exec } = require("child_process");
var imageProcess = require("./imageprocess/cp_imageprocess");
var imageFile = '/Users/paipeng/Development/Wexin/wxminiapp_s2icode/s2icodemodule/js_detect/detect_output/2_0_detect_resize.bmp'; // error invalid blackPoint
var mat = matUtil.readMat(imageFile);
//console.log(mat);

var threshold = imageProcess.threshold(mat).minimum();
console.log('threshold minimum: ', threshold);

threshold = imageProcess.threshold(mat).maxlike();
console.log('threshold maxlike: ', threshold);
// 5. binary
var binaryMat = imageProcess.util().binary(mat, threshold);


var save_file = './detect_output/threshold_bmat.bmp';
matUtil.writeBmpMat(save_file, binaryMat);


exec("open " + save_file, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});

// console.log(mat);

