

const { matUtil } = require("./mat/cp_matutil");
var cpQRDetect = require('./detect/cp_qrdetect.js');
const { exec } = require("child_process");

var imageFile = './test/b3954792-590a-44b6-8ce6-cc69b948b5f2.bmp';
imageFile = '/Users/paipeng/Downloads/27e03efc-9b94-4757-84f5-6ffe373cb6ae.jpeg'; // s2iqrcode error invalid blackPoint

var mat = matUtil.readMat(imageFile);

var result = cpQRDetect(mat).detect({
    crop_factor: 0.8,
    resize_width: 680,
    resize_height: 680,
    code_width: 680,
    code_height: 680,
    min_sharpness: 14
});

console.log(result);

var save_file = './detect_output/8_detected_mat.bmp';
matUtil.writeBmpMat(save_file, result.detectedMat);


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

