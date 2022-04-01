var imageprocess = require('./lib/imageprocess/cp_imageprocess');
var log = require('./lib/log/cp_log');
const { matUtil } = require("./lib/mat/cp_matutil");
var CPUtil = require('./lib/util/cp_util');
var CPDraw = require('./lib/util/cp_draw');
var CPPoint = require('./lib/mat/cp_point');
var CPLine = require('./lib/mat/cp_line');
var CPMat = require('./lib/mat/cp_mat');
var CPRectangle = require('./lib/mat/cp_rectangle');
var CpConvexHull = require('./lib/imageprocess/lib/cp_convex_hull');
var CPCorrelation2d = require('./lib/imageprocess/lib/cp_correlation2d');
var CPConvolution2d = require('./lib/imageprocess/lib/cp_convolution2d');
var CPFlip = require('./lib/imageprocess/lib/cp_flip');

module.exports = {
    imageprocess: imageprocess,
    matUtil: matUtil,
    log: log,
    CPUtil: CPUtil,
    CPDraw: CPDraw,
    CPPoint: CPPoint,
    CPLine: CPLine,
    CPMat: CPMat,
    CPRectangle: CPRectangle,
    CpConvexHull: CpConvexHull,
    CPCorrelation2d: CPCorrelation2d,
    CPConvolution2d: CPConvolution2d,
    CPFlip: CPFlip
};
