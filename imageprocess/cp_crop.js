function CPCrop(mat) {
    this.mat = mat;
}

CPCrop.prototype.crop = function (x, y, width, height) {
    var temp = new Uint8Array(width * height);

    for (var i = y; i < height + y; i++) {
        for (var j = x; j < width + x; j++) {
            temp[(i - y) * width + (j - x)] = this.mat.data[i * this.mat.width + j];
        }
    }

    return {
        width: width,
        height: height,
        channel: 1,
        data: temp
    };
};


module.exports = function (mat) {
    var crop = new CPCrop(mat);
    return crop;
};
