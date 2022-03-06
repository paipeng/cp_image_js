

var resize = require('./lib/cp_resize');
var crop = require('./lib/cp_crop');
var filter = require('./lib/cp_filter');
var util = require('./lib/cp_util');
var contour = require('./lib/cp_contour');
var draw = require('./lib/cp_draw');
var contrast = require('./lib/cp_contrast');
var sharpness = require('./lib/cp_sharpness');
var dilate = require('./lib/cp_dilate');
var erosion = require('./lib/cp_erosion');
var label = require('./lib/cp_label');


function CPIP() {

}
CPIP.prototype.create = function (mat, cropX, cropY, cropWidth, cropHeight, resizeWidth, resizeHeight) {
    var cropPixels = new Uint8Array(cropWidth * cropHeight);
    // set to white !

    // crop pixels
    for (var i = cropY; i < cropHeight; i++) {
        for (var j = cropX; j < cropWidth; j++) {
            if (i >= 0 && i < mat.height && j >= 0 && j < mat.width) {
                cropPixels[(i - cropY) * mat.height * mat.channel + (j - cropX)] = mat.data[i * mat.height * mat.channel + j]
            }
        }
    }

    // resize
    if (resizeWidth == cropWidth && resizeHeight == cropHeight) {
        return resize(mat).resize(resizeWidth, resizeHeight);
    } else {
        return {
            width: mat.width,
            height: mat.height,
            channel: 1,
            data: temp
        };
    }
};


module.exports = {
    resize: resize,
    crop: crop,
    filter: filter,
    util: util,
    contour: contour,
    draw: draw,
    contrast: contrast,
    sharpness: sharpness,
    dilate: dilate,
    erosion: erosion,
    label: label,
    process: new CPIP()
};
