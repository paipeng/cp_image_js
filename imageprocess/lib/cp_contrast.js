
var util = require('./cp_util');
var log = require('../../log/cp_log');

function CpContrast(mat) {
    this.mat = mat;
}


CpContrast.prototype.improve = function (threshold, factor) {
    //var mean = util().mean(this.mat);
    //log.text.print('CpContrast mean: ' + mean + '\n');

    for (var i = 0; i < this.mat.height; i++) {
        for (var j = 0; j < this.mat.width; j++) {
            var f = (this.mat.data[i * this.mat.width + j] > threshold) ? factor : (1 / factor);
            this.mat.data[i * this.mat.width + j] = parseInt(this.mat.data[i * this.mat.width + j] * f);

            if (this.mat.data[i * this.mat.width + j] < 0) {
                this.mat.data[i * this.mat.width + j] = 0;
            } else if (this.mat.data[i * this.mat.width + j] > 255) {
                this.mat.data[i * this.mat.width + j] = 256;
            }
        }
    }

    return this.mat;
};

module.exports = function (mat) {
    var contrast = new CpContrast(mat);
    return contrast;
};