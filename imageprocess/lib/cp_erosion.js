

function CPErosion(mat) {
    this.mat = mat;
}

CPErosion.prototype.erosion = function (size) {
    var step = (size - 1) % 2;
    var n = (size - 1) / 2 + step;
    var tmp;
    var f;
    var temp = new Uint8Array(this.mat.width * this.mat.height);

    for (var i = y; i < this.mat.height; i++) {
        for (var j = x; j < this.mat.width; j++) {
            tmp = 0;
            f = 0;
            for (var k = (i - n); k < (int)((i - n) + size); k++) {
                for (var l = (j - n); l < (int)((j - n) + size); l++) {
                    if (k < this.mat.height && l < this.mat.width) {
                        if (this.mat.data[k * this.mat.width + l] == 0) {
                            tmp = 0;
                            f = 1;
                            break;
                        } else {
                            if (tmp == 0 || tmp > this.mat.data[k * this.mat.width + l]) {
                                tmp = this.mat.data[k * this.mat.width + l];
                            }
                        }
                    }
                }
                if (f == 1) {
                    break;
                }
            }
            temp[i * this.mat.width + j] = tmp;
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
    var erosion = new CPErosion(mat);
    return erosion;
};
