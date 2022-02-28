

function CpDraw(mat) {
    this.mat = mat;
}

CpDraw.prototype.drawPoints = function (points, color) {
    var temp = new Uint8Array(this.mat.width * this.mat.height);
    for (var i = 0; i < this.mat.width * this.mat.height; i++) {
        temp[i] = 0xFF;
    }
    for (var point of points) {
        temp[point.x + point.y * this.mat.width] = 0x0;
    }

    return {
        width: this.mat.width,
        height: this.mat.height,
        channel: 1,
        data: temp
    };
};

module.exports = function (mat) {
    var draw = new CpDraw(mat);
    return draw;
};
