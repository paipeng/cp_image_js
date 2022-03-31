


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

CpUtil.prototype.convertPointToMat = function (points, size) {
    var temp = new Uint8Array(size.width * size.height).fill(255);
    for (var i = 0; i < points.length; i++) {
        temp[points[i].x + points[i].y * size.width] = 0;
    }
    return {
        width: size.width,
        height: size.height,
        channel: 1,
        data: temp
    };
}


CpUtil.prototype.containRectangle = function (rectangle, rectangle1) {

    return (rectangle.top <= rectangle1.top &&
        rectangle.left <= rectangle1.left &&
        rectangle.right >= rectangle1.right &&
        rectangle.bottom >= rectangle1.bottom);
}

CpUtil.prototype.fillConvex = function (mat, color) {
    // fill outside
    for (var i = 0; i < mat.height; i++) {
        var left = -1;
        var right = - 1;
        for (var j = 0; j < mat.width; j++) {
            if (mat.data[i * mat.width + j] == 0) {
                left = j;
                break;
            }
        }
        for (var j = mat.width - 1; j >= 0; j--) {
            if (mat.data[i * mat.width + j] == 0) {
                right = j;
                break;
            }
        }

        if (left != -1 && right != -1 && left < right) {
            for (var j = 0; j < left; j++) {
                mat.data[i * mat.width + j] = 0;
            }
            for (var j = mat.width - 1; j >= right; j--) {
                mat.data[i * mat.width + j] = 0;
            }
        } else if (left == -1 && right == -1 || left == right) {
            for (var j = 0; j < mat.width; j++) {
                mat.data[i * mat.width + j] = 0;
            }
        }
    }
    return this.invert(mat);
}

CpUtil.prototype.countConvex = function (mat) {
    // fill outside
    var count = 0;
    for (var i = 0; i < mat.height; i++) {
        var left = -1;
        var right = - 1;
        for (var j = 0; j < mat.width; j++) {
            if (mat.data[i * mat.width + j] == 0) {
                left = j;
                break;
            }
        }
        for (var j = mat.width - 1; j >= 0; j--) {
            if (mat.data[i * mat.width + j] == 0) {
                right = j;
                break;
            }
        }

        if (left != -1 && right != -1 && left < right) {
            count += right - left;
        }
    }
    return count;
}


CpUtil.prototype.countPointsArea = function (points, mat) {
    var pointsMat = this.convertPointToMat(points, mat)
    return this.countConvex(pointsMat);
}

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
    var min_side = mat.width > mat.height ? mat.height : mat.width;

    var current_point = {
        x: parseInt(mat.width / 2),
        y: parseInt(mat.height / 2)
    };
    //console.log('current_point: ', current_point);

    for (var i = 0; i < parseInt((min_side - 1) / 2); i++) {// 
        current_point.x -= 1;
        current_point.y += 1;
        //

        // left
        for (var j = 1; j < (i + 1) * 2 + 1; j++) {
            current_point.y--;
            /*
            if (current_point.x == 162 && current_point.y == 284) {
                console.log('pl: ', current_point, mat.data[current_point.y * mat.width + current_point.x]);
            }
            */
            if (mat.data[current_point.y * mat.width + current_point.x] == 0) {
                return current_point;
            }
        }
        // top
        for (var j = 1; j < (i + 1) * 2 + 1; j++) {
            current_point.x++;
            /*
            if (current_point.x == 162 && current_point.y == 284) {

                console.log('pt: ', current_point, mat.data[current_point.y * mat.width + current_point.x]);
            }
            */
            if (mat.data[current_point.y * mat.width + current_point.x] == 0) {
                return current_point;
            }
        }
        // right
        for (var j = 1; j < (i + 1) * 2 + 1; j++) {
            current_point.y++;
            /*
                        if (current_point.x == 162 && current_point.y == 284) {
                            console.log('pr: ', current_point, mat.data[current_point.y * mat.width + current_point.x]);
                        }
                        */
            if (mat.data[current_point.y * mat.width + current_point.x] == 0) {
                return current_point;
            }
        }
        // bottom
        for (var j = 1; j < (i + 1) * 2 + 1; j++) {
            current_point.x--;
            /*
                        if (current_point.x == 162 && current_point.y == 284) {
                            console.log('pb: ', current_point, mat.data[current_point.y * mat.width + current_point.x]);
                        }
                        */
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
    var temp = new Uint8Array(mat.width * mat.height * mat.channel);
    for (var i = 0; i < mat.height; i++) {
        for (var j = 0; j < mat.width * mat.channel; j++) {
            temp[i * mat.width * mat.channel + j] = 255 - mat.data[i * mat.width * mat.channel + j];
        }
    }
    return {
        width: mat.width,
        height: mat.height,
        channel: mat.channel,
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
    //console.log(sum);
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
    } else if (mat.channel == 3) {
        var temp = new Uint8Array(mat.width * mat.height);
        for (var i = 0; i < mat.height; i++) {
            for (var j = 0; j < mat.width * mat.channel; j += 3) {
                temp[i * mat.width + j / 3] = parseInt((mat.data[i * mat.width * mat.channel + j] + mat.data[i * mat.width * mat.channel + j + 1] + mat.data[i * mat.width * mat.channel + j + 2]) / 3);
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


CpUtil.prototype.color = function (mat) {
    if (mat.channel == 1) {
        var temp = new Uint8Array(mat.width * mat.height * 4);
        for (var i = 0; i < mat.height; i++) {
            for (var j = 0; j < mat.width * mat.channel; j++) {
                temp[i * mat.width * 4 + j * 4] = mat.data[i * mat.width * mat.channel + j];
                temp[i * mat.width * 4 + j * 4 + 1] = mat.data[i * mat.width * mat.channel + j];
                temp[i * mat.width * 4 + j * 4 + 2] = mat.data[i * mat.width * mat.channel + j];
                temp[i * mat.width * 4 + j * 4 + 3] = 255;
            }
        }
        return {
            width: mat.width,
            height: mat.height,
            channel: 4,
            data: temp
        };
    } else {
        return mat;
    }
};

CpUtil.prototype.expandBorder = function (mat, size) {
    var temp = new Uint8Array(size.width * size.height).fill(155);

    var offset_x = parseInt((size.width - mat.width) / 2);
    var offset_y = parseInt((size.height - mat.height) / 2);
    console.log('expandBorder offset x/y: ', offset_x, offset_y);
    for (var i = 0; i < mat.height; i++) {
        for (var j = 0; j < mat.width; j++) {
            temp[(i + offset_y) * size.width + j + offset_x] = mat.data[i * mat.width + j];
        }
    }


    return {
        width: size.width,
        height: size.height,
        data: temp
    };
}


CpUtil.prototype.convertToRGBMat = function (mat) {
    console.log('convertToRGBMat');
    var rgbPixels = new Uint8Array(mat.width * mat.height * 3);


    for (var i = 0; i < mat.height; i++) {
        for (var j = 0; j < mat.width; j++) {
            rgbPixels[i * mat.width * 3 + j * 3] = mat.data[i * mat.width + j];
            rgbPixels[i * mat.width * 3 + j * 3 + 1] = mat.data[i * mat.width + j];
            rgbPixels[i * mat.width * 3 + j * 3 + 2] = mat.data[i * mat.width + j];
        }
    }

    return {
        width: mat.width,
        height: mat.height,
        data: rgbPixels,
        channel: 3
    };
}



CpUtil.prototype.convertToRGBAMat = function (mat) {
    console.log('convertToRGBAMat');
    var rgbPixels = new Uint8Array(mat.width * mat.height * 4);


    for (var i = 0; i < mat.height; i++) {
        for (var j = 0; j < mat.width; j++) {
            rgbPixels[i * mat.width * 4 + j * 4] = mat.data[i * mat.width + j];
            rgbPixels[i * mat.width * 4 + j * 4 + 1] = mat.data[i * mat.width + j];
            rgbPixels[i * mat.width * 4 + j * 4 + 2] = mat.data[i * mat.width + j];
            rgbPixels[i * mat.width * 4 + j * 4 + 3] = 255;
        }
    }

    return {
        width: mat.width,
        height: mat.height,
        data: rgbPixels,
        channel: 4
    };
}

module.exports = function () {
    var util = new CpUtil();
    return util;
};
