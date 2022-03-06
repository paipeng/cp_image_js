


function CpUtil() {

}

CpUtil.prototype.binary = function (mat, threshold) {
    var temp = new Uint8Array(mat.width * mat.height);
    for (var i = 0; i < mat.height; i++) {
        for (var j = 0; j < mat.width * mat.channel; j++) {
            temp[i * mat.width * mat.channel + j] = (mat.data[i * mat.width * mat.channel + j] > threshold) ? 255 : 0;
        }
    }
    return {
        width: mat.width,
        height: mat.height,
        channel: 1,
        data: temp
    };
};

CpUtil.prototype.invert = function (mat) {
    var temp = new Uint8Array(mat.width * mat.height);
    for (var i = 0; i < mat.height; i++) {
        for (var j = 0; j < mat.width * mat.channel; j++) {
            temp[i * mat.width * mat.channel + j] = 255 - mat.data[i * mat.width * mat.channel + j];
        }
    }
    return {
        width: mat.width,
        height: mat.height,
        channel: 1,
        data: temp
    };
}


CpUtil.prototype.mean = function (mat) {
    let sum = new Number(0);
    for (var i = 0; i < mat.height; i++) {
        for (var j = 0; j < mat.width * mat.channel; j++) {
            sum += mat.data[i * mat.width * mat.channel + j];
        }
    }
    console.log(sum);
    return sum / (mat.width * mat.height);
};



CpUtil.prototype.gray = function (mat) {
    var temp = new Uint8Array(mat.width * mat.height);
    for (var i = 0; i < mat.height; i++) {
        for (var j = 0; j < mat.width * mat.channel; j += mat.channel) {
            sum += mat.data[i * mat.width * mat.channel + j];
        }
    }
    return {
        width: mat.width,
        height: mat.height,
        channel: 1,
        data: temp
    };
};

module.exports = function () {
    var util = new CpUtil();
    return util;
};
