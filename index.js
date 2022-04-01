var imageprocess = require('./lib/imageprocess/cp_imageprocess');
var log = require('./lib/log/cp_log');
const { matUtil } = require("./lib/mat/cp_matutil");
var CPUtil = require('./lib/util/cp_util');
var CPDraw = require('./lib/util/cp_draw');
var CPPoint = require('./lib/mat/cp_point');
var CPLine = require('./lib/mat/cp_line');

module.exports = {
    imageprocess: imageprocess,
    matUtil: matUtil,
    log: log,
    CPUtil: CPUtil,
    CPDraw: CPDraw,
    CPPoint: CPPoint,
    CPLine: CPLine
};