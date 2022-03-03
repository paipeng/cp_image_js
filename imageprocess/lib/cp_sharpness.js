
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

module.exports = function (mat) {
    var sharpness = new CPSharpness(mat);
    return sharpness;
};
