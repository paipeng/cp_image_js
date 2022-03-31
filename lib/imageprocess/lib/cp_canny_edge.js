var SOBEL_X_FILTER = [[-1, 0, 1],
[-2, 0, 2],
[-1, 0, 1]];
var SOBEL_Y_FILTER = [[1, 2, 1],
[0, 0, 0],
[-1, -2, -1]];
var ROBERTS_X_FILTER = [[1, 0],
[0, -1]];
var ROBERTS_Y_FILTER = [[0, 1],
[-1, 0]];
var PREWITT_X_FILTER = [[-1, 0, 1],
[-1, 0, 1],
[-1, 0, 1]];
var PREWITT_Y_FILTER = [[-1, -1, -1],
[0, 0, 0],
[1, 1, 1]];

const OPERATORS = {
    "sobel": {
        x: SOBEL_X_FILTER,
        y: SOBEL_Y_FILTER,
        len: SOBEL_X_FILTER.length
    },
    "roberts": {
        x: ROBERTS_X_FILTER,
        y: ROBERTS_Y_FILTER,
        len: ROBERTS_Y_FILTER.length
    },
    "prewitt": {
        x: PREWITT_X_FILTER,
        y: PREWITT_Y_FILTER,
        len: PREWITT_Y_FILTER.length
    }
};

function CPCanny(mat) {
    this.mat = mat;
}

//find intensity gradient of image
CPCanny.prototype.gradient = function (op) {
    console.time('gradient: ' + op);
    var temp = new Uint8Array(this.mat.width * this.mat.height);

    var filter_size = OPERATORS[op].len;
    for (var i = 0; i < this.mat.height; i++) {
        for (var j = 0; j < this.mat.width; j++) {
            // var edgeX = edgeY = 0;
            // 微信小程序需要拆开写
            var edgeX = 0;
            var edgeY = 0;
            for (var k = parseInt(-filter_size / 2); k < parseInt(filter_size / 2) + filter_size % 2; k++) {
                for (var l = parseInt(-filter_size / 2); l < parseInt(filter_size / 2) + filter_size % 2; l++) {
                    //console.log('index: ' + (k + parseInt(filter_size / 2) + '-' + (l + parseInt(filter_size / 2))));
                    //console.log(OPERATORS[op]["x"][k + parseInt(filter_size / 2)][l + parseInt(filter_size / 2)]);
                    if ((i + k) >= 0 && (i + k) < this.mat.height && (j + l) >= 0 && (j + l) < this.mat.width) {
                        edgeX += this.mat.data[(i + k) * this.mat.width + (j + l)] * OPERATORS[op]["x"][k + parseInt(filter_size / 2)][l + parseInt(filter_size / 2)];
                        edgeY += this.mat.data[(i + k) * this.mat.width + (j + l)] * OPERATORS[op]["y"][k + parseInt(filter_size / 2)][l + parseInt(filter_size / 2)];
                    }
                }
            }

            var pixel = parseInt(Math.round(Math.sqrt(edgeX * edgeX + edgeY * edgeY)));
            if (pixel > 255) {
                pixel = 255;
            } else if (pixel < 0) {
                pixel = 0;
            }
            pixel = pixel > 70 ? 255 : 0;
            temp[i * this.mat.width + j] = pixel;
        }
    }
    console.timeEnd('gradient: ' + op);
    return {
        width: this.mat.width,
        height: this.mat.height,
        channel: 1,
        data: temp
    };
};


module.exports = function (mat) {
    var cpCanny = new CPCanny(mat);
    return cpCanny;
};
