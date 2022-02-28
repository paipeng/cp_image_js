

var resize = require('./cp_resize');
var crop = require('./cp_crop');
var filter = require('./cp_filter');
var util = require('./cp_util');
var contour = require('./cp_contour');
var draw = require('./cp_draw');
var contrast = require('./cp_contrast');

module.exports = {
    resize: resize,
    crop: crop,
    filter: filter,
    util: util,
    contour: contour,
    draw: draw,
    contrast: contrast
};
