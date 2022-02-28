

function CPReisze(mat) {
    this.mat = mat;
}

CPReisze.prototype.resize = function (resizeWidth, resizeHeight) {
    var temp = new Uint32Array(resizeWidth * resizeHeight);
    var a, b, c, d, x, y, index;
    var x_ratio = ((this.mat.width - 1)) / resizeWidth;
    var y_ratio = ((this.mat.height - 1)) / resizeHeight;
    var x_diff, y_diff, gray;
    var offset = 0;
    for (var i = 0; i < resizeHeight; i++) {
        for (var j = 0; j < resizeWidth; j++) {
            x = parseInt((x_ratio * j));
            y = parseInt((y_ratio * i));
            x_diff = (x_ratio * j) - x;
            y_diff = (y_ratio * i) - y;
            index = (y * this.mat.width + x);
            a = this.mat.data[index];
            b = this.mat.data[index + 1];
            c = this.mat.data[index + this.mat.height];
            d = this.mat.data[index + this.mat.height + 1];

            // gray element
            // Yb = Ab(1-w)(1-h) + Bb(w)(1-h) + Cb(h)(1-w) + Db(wh)
            gray = (a & 0xff) * (1 - x_diff) * (1 - y_diff) + (b & 0xff) * (x_diff) * (1 - y_diff) +
                (c & 0xff) * (y_diff) * (1 - x_diff) + (d & 0xff) * (x_diff * y_diff);

            temp[offset++] = parseInt(gray);
        }
    }
    return {
        width: resizeWidth,
        height: resizeHeight,
        channel: 1,
        data: temp
    };
};

module.exports = function (mat) {
    var resize = new CPReisze(mat);
    return resize;
};
