

function CpDraw(mat) {
    this.mat = mat;
}

CpDraw.prototype.drawPoints = function (points, color) {
    var temp = new Uint8Array(this.mat.width * this.mat.height);
    for (var i = 0; i < this.mat.width * this.mat.height; i++) {
        temp[i] = 0xFF;
    }
    for (var point of points) {
        temp[point.x + point.y * this.mat.width] = color;
    }

    return {
        width: this.mat.width,
        height: this.mat.height,
        channel: 1,
        data: temp
    };
};


CpDraw.prototype.drawRectangle = function (rect, color) {
    var temp = new Uint8Array(this.mat.width * this.mat.height);
    for (var i = 0; i < this.mat.width * this.mat.height; i++) {
        temp[i] = 0xFF;
    }

    for (var i = rect.left; i <= rect.right; i++) {
        temp[rect.top * this.mat.width + i] = color;
        temp[rect.bottom * this.mat.width + i] = color;
    }

    for (var i = rect.top; i <= rect.bottom; i++) {
        temp[i * this.mat.width + rect.left] = color;
        temp[i * this.mat.width + rect.right] = color;
    }

    return {
        width: this.mat.width,
        height: this.mat.height,
        channel: 1,
        data: temp
    };
};



CpDraw.prototype.drawRectangleOnMat = function (mat, rect, color) {
    for (var i = rect.left; i <= rect.right; i++) {
        mat.data[rect.top * this.mat.width + i] = color;
        mat.data[rect.bottom * this.mat.width + i] = color;
    }

    for (var i = rect.top; i <= rect.bottom; i++) {
        mat.data[i * this.mat.width + rect.left] = color;
        mat.data[i * this.mat.width + rect.right] = color;
    }

    return mat
};

module.exports = function (mat) {
    var draw = new CpDraw(mat);
    return draw;
};
