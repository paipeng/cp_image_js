function CPFilter(mat) {
    this.mat = mat;
}

CPFilter.prototype.blur = function () {
    var gaussian_blur = [
        [1, 2, 1],
        [2, 4, 2],
        [1, 2, 1]
    ];




    var temp = new Uint8Array(this.mat.width * this.mat.height);

    for (var i = 0; i < this.mat.height - 3; i++) {
        for (var j = 0; j < this.mat.width - 3; j++) {
            var pixel = 0;
            for (var k = 0; k < 3; k++) {
                for (var l = 0; l < 3; l++) {
                    pixel += this.mat.data[(i + k) * this.mat.width + (j + l)] * gaussian_blur[k][l] / 16;
                }
            }
            temp[i * this.mat.width + j] = pixel;
        }
    }

    return {
        width: this.mat.width,
        height: this.mat.height,
        channel: 1,
        data: temp
    };
};


module.exports = function (mat) {
    var filter = new CPFilter(mat);
    return filter;
};
