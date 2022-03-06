
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

module.exports = function (mat) {
    var sharpness = new CPSharpness(mat);
    return sharpness;
};
