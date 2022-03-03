

var resize = require('./lib/cp_resize');
var crop = require('./lib/cp_crop');
var filter = require('./lib/cp_filter');
var util = require('./lib/cp_util');
var contour = require('./lib/cp_contour');
var draw = require('./lib/cp_draw');
var contrast = require('./lib/cp_contrast');
var sharpness = require('./lib/cp_sharpness');

module.exports = {
    resize: resize,
    crop: crop,
    filter: filter,
    util: util,
    contour: contour,
    draw: draw,
    contrast: contrast,
    sharpness: sharpness
};
