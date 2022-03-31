

// var jpeg = require('jpeg-js');
var jpeg = require('../../../js_httpclient/jpeg-js/index.js');
if ((typeof wx) == 'undefined') {
    var fs = require("fs");
}
var util = require('../imageprocess/lib/cp_util');
var bmp = require("../bmp/cp_bmp");
function CpMatUtil() {

}

CpMatUtil.prototype.writeMat = function (file_name, mat, compress) {
    if ((typeof wx) == 'undefined') {
        var colorMat = util().color(mat);
        var jpegImageData = jpeg.encode(colorMat, 50);
        fs.writeFileSync(file_name, jpegImageData.data);
    }
}

/**
 * 
 * @param {string} file_name 
 * @returns 
 */
CpMatUtil.prototype.readMat = function (file_name) {
    if (file_name.endsWith('.jpeg') || file_name.endsWith('.jpg')) {
        var jpegData = fs.readFileSync(file_name);
        var mat = jpeg.decode(jpegData);
        mat.channel = mat.data.length / (mat.width * mat.height);
        return mat;
    } else if (file_name.endsWith('.bmp')) {
        var mat = bmp.reader(file_name);
        return mat;
    }
}
/**
 * 
 * @param {string} file_name 
 * @param {*} mat 
 */
CpMatUtil.prototype.writeBmpMat = function (file_name, mat) {
    //console.log(typeof WechatMiniprogram);
    if ((typeof wx) == 'undefined') {
        bmp.writer(file_name, mat);
    }
}


module.exports = {
    matUtil: new CpMatUtil(),
};
