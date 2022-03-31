

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
var histogram = require('./lib/cp_histogram');
var convolution2d = require('./lib/cp_convolution2d');
var threshold = require('./lib/cp_threshold');

var cpcanny = require('./lib/cp_canny_edge');
var convexHull = require('./lib/cp_convex_hull');

function CPIP() {

}
CPIP.prototype.create = function (mat, cropRect, resizeWidth, resizeHeight) {
    var cropX, cropY, cropWidth, cropHeight;
    var cropPixels = new Uint8Array(cropWidth * cropHeight);
    // set to white !

    // crop pixels
    for (var i = cropRect.y; i < cropRect.height; i++) {
        for (var j = cropRect.x; j < cropRect.width; j++) {
            if (i >= 0 && i < mat.height && j >= 0 && j < mat.width) {
                cropPixels[(i - cropRect.y) * mat.height * mat.channel + (j - cropRect.x)] = mat.data[i * mat.height * mat.channel + j]
            }
        }
    }

    var cropMat = {
        width: mat.width,
        height: mat.height,
        channel: 1,
        data: cropPixels
    };
    // resize
    if (resizeWidth == cropRect.width && resizeHeight == cropRect.height) {
        return resize(cropMat).resize(resizeWidth, resizeHeight);
    } else {
        return cropMat;
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
    histogram: histogram,
    convolution2d: convolution2d,
    threshold: threshold,
    cpcanny: cpcanny,
    convexHull: convexHull,
    process: new CPIP()
};
