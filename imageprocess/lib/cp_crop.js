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


CPCrop.prototype.cropRect = function (cropRect) {
    var cropPixels = new Uint8Array(cropRect.width * cropRect.height);
    for (var i = cropRect.y; i < cropRect.y + cropRect.height; i++) {
        for (var j = cropRect.x; j < cropRect.x + cropRect.width; j++) {
            if (i >= 0 && i < this.mat.height && j >= 0 && j < this.mat.width) {
                cropPixels[(i - cropRect.y) * cropRect.width + (j - cropRect.x)] = this.mat.data[i * this.mat.width + j]
            } else {
                cropPixels[(i - cropRect.y) * cropRect.width + (j - cropRect.x)] = 255;
            }
        }
    }
    return {
        width: cropRect.width,
        height: cropRect.height,
        channel: 1,
        data: cropPixels
    };
};


module.exports = function (mat) {
    var crop = new CPCrop(mat);
    return crop;
};
