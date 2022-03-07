


function CpUtil() {

}

CpUtil.prototype.binary = function (mat, threshold) {
    var temp = new Uint8Array(mat.width * mat.height);
    for (var i = 0; i < mat.height; i++) {
        for (var j = 0; j < mat.width * mat.channel; j++) {
            temp[i * mat.width * mat.channel + j] = (mat.data[i * mat.width * mat.channel + j] > threshold) ? 255 : 0;
        }
    }
    return {
        width: mat.width,
        height: mat.height,
        channel: 1,
        data: temp
    };
};


CpUtil.prototype.mono = function (mat, size) {
    var temp = new Uint8Array(mat.width * mat.height);
    var mean;
    var count;
    for (var i = 0; i < mat.height; i++) {
        for (var j = 0; j < mat.width; j++) {
            mean = 0;
            count = 0;
            for (var k = parseInt(-size / 2); k <= parseInt(size / 2); k++) {
                for (var l = parseInt(-size / 2); l <= parseInt(size / 2); l++) {
                    if ((i + k) >= 0 && (i + k) < mat.height && (j + l) >= 0 && (j + l) < mat.width) {
                        temp[i * mat.width * mat.channel + j] = mat.data[i * mat.width * mat.channel + j];
                    }
                }
            }
        }
    }
    return {
        width: mat.width,
        height: mat.height,
        channel: 1,
        data: temp
    };
};

CpUtil.prototype.getCenterPoint = function (mat) {
    var mean;
    var count;

    console.log(mat);

    var min_side = mat.width > mat.height ? mat.height : mat.width;

    var start_point = {
        x: parseInt(mat.width / 2),
        y: parseInt(mat.height / 2)
    };
    for (var i = 0; i < parseInt((min_side - 1) / 8); i++) {

        var current_point = {
            x: parseInt(mat.width / 2),
            y: parseInt(mat.height / 2)
        };
        current_point.x -= i + 1;
        current_point.y += i + 1;
        console.log(current_point);

        // left
        for (var j = 1; j < (i + 1) * 2 + 1; j++) {
            current_point.y--;
            console.log('pl: ', current_point, mat.data[current_point.y * mat.width + current_point.x]);
            if (mat.data[current_point.y * mat.width + current_point.x] == 0) {
                return current_point;
            }
        }
        // top
        for (var j = 1; j < (i + 1) * 2 + 1; j++) {
            current_point.x++;
            //console.log('pt: ', current_point);
            if (mat.data[current_point.y * mat.width + current_point.x] == 0) {
                return current_point;
            }
        }
        // right
        for (var j = 1; j < (i + 1) * 2 + 1; j++) {
            current_point.y++;
            //console.log('pr: ', current_point);

            if (mat.data[current_point.y * mat.width + current_point.x] == 0) {
                return current_point;
            }
        }

        // bottom
        for (var j = 1; j < (i + 1) * 2 + 1; j++) {
            current_point.x--;
            //console.log('pb: ', current_point);

            if (mat.data[current_point.y * mat.width + current_point.x] == 0) {
                return current_point;
            }
        }
    }

    return {
        x: 0,
        y: 0
    };
};



CpUtil.prototype.invert = function (mat) {
    var temp = new Uint8Array(mat.width * mat.height);
    for (var i = 0; i < mat.height; i++) {
        for (var j = 0; j < mat.width * mat.channel; j++) {
            temp[i * mat.width * mat.channel + j] = 255 - mat.data[i * mat.width * mat.channel + j];
        }
    }
    return {
        width: mat.width,
        height: mat.height,
        channel: 1,
        data: temp
    };
}


CpUtil.prototype.mean = function (mat) {
    let sum = new Number(0);
    for (var i = 0; i < mat.height; i++) {
        for (var j = 0; j < mat.width * mat.channel; j++) {
            sum += mat.data[i * mat.width * mat.channel + j];
        }
    }
    console.log(sum);
    return sum / (mat.width * mat.height);
};



CpUtil.prototype.gray = function (mat) {
    if (mat.channel == 4) {
        var temp = new Uint8Array(mat.width * mat.height);
        for (var i = 0; i < mat.height; i++) {
            for (var j = 0; j < mat.width * mat.channel; j += 4) {
                temp[i * mat.width + j / 4] = parseInt((mat.data[i * mat.width * mat.channel + j] + mat.data[i * mat.width * mat.channel + j + 1] + mat.data[i * mat.width * mat.channel + j + 2]) / 3);
            }
        }
        return {
            width: mat.width,
            height: mat.height,
            channel: 1,
            data: temp
        };
    } else {
        return mat;
    }
};

module.exports = function () {
    var util = new CpUtil();
    return util;
};
