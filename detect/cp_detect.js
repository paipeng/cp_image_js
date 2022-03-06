
var imageProcess = require("../imageprocess/cp_imageprocess");


function CPDetect(mat) {
    this.mat = mat;
}
CPDetect.prototype.detect = function (mat, cropRect, resizeWidth, resizeHeight) {
};



module.exports = function (mat) {
    detect: new CPDetect(mat)
};
