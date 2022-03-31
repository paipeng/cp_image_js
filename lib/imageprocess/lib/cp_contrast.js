
var util = require('./cp_util');
//var log = require('../../log/cp_log');

function CpContrast() {

}


CpContrast.prototype.improve = function (mat, threshold, factor) {
    var temp = new Uint8Array(mat.width * mat.height * mat.channel);

    for (var i = 0; i < mat.height; i++) {
        for (var j = 0; j < mat.width * mat.channel; j++) {
            var f = (mat.data[i * mat.width + j] > threshold) ? factor : (1 / factor);
            temp[i * mat.width * mat.channel + j] = parseInt(mat.data[i * mat.width * mat.channel + j] * f);

            if (temp[i * mat.width * mat.channel + j] < 0) {
                temp[i * mat.width * mat.channel + j] = 0;
            } else if (temp[i * mat.width * mat.channel + j] > 255) {
                temp[i * mat.width * mat.channel + j] = 256;
            }
        }
    }
    return {
        width: mat.width,
        height: mat.height,
        channel: mat.channel,
        data: temp
    };
};



CpContrast.prototype.improve2 = function (mat, factor, sigma) {
    var temp = new Uint8Array(mat.width * mat.height * mat.channel);
    for (var i = 0; i < mat.height; i++) {
        for (var j = 0; j < mat.width * mat.channel; j++) {
            temp[i * mat.width * mat.channel + j] = parseInt(mat.data[i * mat.width + j] * factor + sigma);
            if (temp[i * mat.width * mat.channel + j] < 0) {
                temp[i * mat.width * mat.channel + j] = 0;
            } else if (temp[i * mat.width * mat.channel + j] > 255) {
                temp[i * mat.width * mat.channel + j] = 256;
            }

        }
    }

    return {
        width: mat.width,
        height: mat.height,
        channel: mat.channel,
        data: temp
    };
};



CpContrast.prototype.improve3 = function (mat, contrast_percentage) {
    var temp = new Uint8Array(mat.width * mat.height * mat.channel);
    contrast_percentage *= 2.55;
    if (contrast_percentage < -255)
        contrast_percentage = -255;
    else if (contrast_percentage > 255)
        contrast_percentage = 255;

    var factor = (259 * (contrast_percentage + 255)) / (255 * (259 - contrast_percentage));
    for (var i = 0; i < mat.width * mat.height * mat.channel; i++) {
        var pixel = parseInt(factor * (mat.data[i] - 128) + 128);
        if (pixel < 0) {
            pixel = 0;
        } else if (pixel > 255) {
            pixel = 255;
        }
        temp[i] = pixel;
    }

    return {
        width: mat.width,
        height: mat.height,
        channel: mat.channel,
        data: temp
    };
};

CpContrast.prototype.linearStretch = function (mat, max, min) {
    var temp = new Uint8Array(mat.width * mat.height * mat.channel);
    for (var j = 0; j < mat.width * mat.height * mat.channel; j++) {
        var pixel = mat.data[j] - min;
        pixel = parseInt(pixel * 255 / (max - min));
        if (pixel < 0) {
            pixel = 0;
        } else if (pixel > 255) {
            pixel = 255;
        }
        temp[j] = pixel;
    }
    return {
        width: mat.width,
        height: mat.height,
        channel: mat.channel,
        data: temp
    };
}

CpContrast.prototype.pwLinearStretch = function (contrastAmount) {

}


module.exports = function () {
    var contrast = new CpContrast();
    return contrast;
};