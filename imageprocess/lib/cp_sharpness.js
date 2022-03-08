
var histogram = require('./cp_histogram');

function CPSharpness(mat) {
    this.mat = mat;
}

CPSharpness.prototype.SMD = function () {
    var out = 0;
    for (var i = 0; i < this.mat.height - 1; i++) {
        for (var j = 0; j < this.mat.width - 1; j++) {
            out += Math.abs(this.mat.data[i * this.mat.width + j] - this.mat.data[(i + 1) * this.mat.width + j]);
            out += Math.abs(this.mat.data[i * this.mat.width + j] - this.mat.data[i * this.mat.width + j + 1]);
        }
    }
    return out / (this.mat.width * this.mat.height);

};


CPSharpness.prototype.sharpness = function (rect) {
    var out = 0;
    for (var i = rect.top; i < rect.bottom; i++) {
        for (var j = rect.left; j < rect.right; j++) {
            out += Math.abs(this.mat.data[i * this.mat.width + j] - this.mat.data[(i + 1) * this.mat.width + j]);
            out += Math.abs(this.mat.data[i * this.mat.width + j] - this.mat.data[i * this.mat.width + j + 1]);
        }
    }
    return out / ((rect.right - rect.left) * (rect.bottom - rect.top));

};

CPSharpness.prototype.meanIntensitive = function (rect) {
    let sum_total = (rect.right - rect.left) * (rect.bottom - rect.top);
    let cumul_histogram = new Array(256).fill(0);
    let sum_elems = 0;
    let idx_lo = 0;
    let idx_hi = 0;
    let i_level;
    let mean_intensity;

    const LEVEL_BLACK = 0.25;
    const LEVEL_WHITE = 0.75;
    const MINDIST_BLACKWHITE = 20; //TODO 原值40  

    var hist = histogram(this.mat).histogramInRect(rect);

    for (let i = 0; i < cumul_histogram.length; i++) {
        sum_elems = 0;
        for (let j = 0; j <= i; j++) {
            sum_elems += hist[j];
        }
        cumul_histogram[i] = sum_elems / sum_total;
    }

    for (let i = 0; i < cumul_histogram.length; i++) {
        if (cumul_histogram[i] > LEVEL_BLACK && idx_lo == 0)
            idx_lo = i;
        if (cumul_histogram[i] > LEVEL_WHITE && idx_hi == 0)
            idx_hi = i;
    }

    i_level = (idx_hi - idx_lo); // output 1
    mean_intensity = (idx_hi + idx_lo) / 2;
    if (i_level > MINDIST_BLACKWHITE) {
        return {
            'success': true,
            'i_level': i_level,
            'mean_intensity': mean_intensity,
            'idx_hi': idx_hi,
            'idx_lo': idx_lo
        };
    } else {
        return {
            'success': false,
            'i_level': i_level,
            'mean_intensity': mean_intensity,
            'idx_hi': idx_hi,
            'idx_lo': idx_lo
        };
    }
};

module.exports = function (mat) {
    var sharpness = new CPSharpness(mat);
    return sharpness;
};
