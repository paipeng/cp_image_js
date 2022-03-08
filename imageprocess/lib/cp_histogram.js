function CpHistogram(mat) {
    this.mat = mat;
}


CpHistogram.prototype.histogram = function () {
    return this.histogramInRect({ top: 0, left: 0, right: this.mat.width, bottom: this.mat.height });
};

CpHistogram.prototype.histogramInRect = function (rect) {
    let histogram = new Array(256).fill(0);
    for (var i = rect.top; i < rect.bottom; i++) {
        for (var j = rect.left; j < rect.right; j++) {
            histogram[this.mat.data[i * this.mat.width + j]]++;
        }
    }
    return histogram;
};

module.exports = function (mat) {
    var histogram = new CpHistogram(mat);
    return histogram;
};
