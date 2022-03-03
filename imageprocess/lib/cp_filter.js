

//var log = require("../../log/cp_log");
function CPFilter(mat) {
    this.mat = mat;
}



CPFilter.prototype.blur = function (filter_size) {
    var filter_size = (filter_size % 2 == 1) ? filter_size : (filter_size + 1);
    var blur_filter = new Float32Array(filter_size * filter_size);
    for (var i = 0; i < filter_size * filter_size; i++) {
        blur_filter[i] = 1;
    }

    var temp = new Uint8Array((this.mat.width) * (this.mat.height));


    // console.log('filter_size /2 : ' + parseInt(-filter_size / 2));

    for (var i = 0; i < this.mat.height; i++) {
        for (var j = 0; j < this.mat.width; j++) {
            var pixel = 0;
            var count = 0;
            for (var k = parseInt(-filter_size / 2); k <= parseInt(filter_size / 2); k++) {
                for (var l = parseInt(-filter_size / 2); l <= parseInt(filter_size / 2); l++) {
                    if ((i + k) >= 0 && (i + k) < this.mat.height && (j + l) >= 0 && (j + l) < this.mat.width) {
                        pixel += this.mat.data[(i + k) * this.mat.width + (j + l)] * (blur_filter[(k + parseInt(filter_size / 2)) * filter_size + (l + parseInt(filter_size / 2))]);
                        count++;
                    }
                }
            }
            temp[i * this.mat.width + j] = parseInt(pixel / count);
        }
    }

    return {
        width: this.mat.width,
        height: this.mat.height,
        channel: 1,
        data: temp
    };
};

CPFilter.prototype.gaussBlur = function (filter_size) {
    var filter_size = (filter_size % 2 == 1) ? filter_size : (filter_size + 1);
    var gaussian_blur = new Float32Array(filter_size * filter_size);

    for (var i = 0; i < filter_size / 2; i++) {
        gaussian_blur[i * filter_size] = Math.pow(2, i);
        sum += gaussian_blur[i * filter_size];
        gaussian_blur[i * filter_size + filter_size - 1] = Math.pow(2, i);
        sum += gaussian_blur[i * filter_size + filter_size - 1];
        gaussian_blur[(filter_size - i - 1) * filter_size] = Math.pow(2, i);
        sum += gaussian_blur[(filter_size - i - 1) * filter_size];
        gaussian_blur[(filter_size - i - 1) * filter_size + filter_size - 1] = Math.pow(2, i);
        sum += gaussian_blur[(filter_size - i - 1) * filter_size + filter_size - 1];
        for (var j = 1; j < filter_size / 2; j++) {
            gaussian_blur[i * filter_size + j] = gaussian_blur[i * filter_size + j - 1] * 2;
            sum += gaussian_blur[i * filter_size + j];
            gaussian_blur[i * filter_size + (filter_size - j - 1)] = gaussian_blur[i * filter_size + j - 1] * 2;
            sum += gaussian_blur[i * filter_size + (filter_size - j - 1)];

            gaussian_blur[(filter_size - i - 1) * filter_size + j] = gaussian_blur[i * filter_size + j - 1] * 2;
            sum += gaussian_blur[(filter_size - i - 1) * filter_size + j];
            gaussian_blur[(filter_size - i - 1) * filter_size + (filter_size - j - 1)] = gaussian_blur[i * filter_size + j - 1] * 2;
            sum += gaussian_blur[(filter_size - i - 1) * filter_size + (filter_size - j - 1)];
        }
    }
    //log.array.print(gaussian_blur, filter_size, filter_size);

    var sum = 0;
    for (var i = 0; i < filter_size; i++) {
        for (var j = 0; j < filter_size; j++) {
            sum += gaussian_blur[i * filter_size + j];
        }
    }
    //console.log('sum: ' + sum);

    for (var i = 0; i < filter_size; i++) {
        for (var j = 0; j < filter_size; j++) {
            gaussian_blur[i * filter_size + j] /= sum;
        }
    }
    //log.array.print(gaussian_blur, filter_size, filter_size);

    var temp = new Uint8Array((this.mat.width) * (this.mat.height));

    for (var i = 0; i < this.mat.height - filter_size; i++) {
        for (var j = 0; j < this.mat.width - filter_size; j++) {
            var pixel = 0;
            for (var k = 0; k < filter_size; k++) {
                for (var l = 0; l < filter_size; l++) {
                    pixel += this.mat.data[(i + k) * this.mat.width + (j + l)] * (gaussian_blur[k * filter_size + l]);
                }
            }
            temp[i * this.mat.width + j] = parseInt(pixel);
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
