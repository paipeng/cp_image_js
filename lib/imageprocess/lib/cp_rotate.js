var CPMat = require('../../mat/cp_mat');

class CPRotate {
    constructor() {

    }

    /**
     * 
     * @param {CPMat} mat 
     * @param {number} degree 
     * @returns {CPMat}
     */
    rotate(mat, degree) {
        console.log('rotate', degree);

        var i, j, x, y, nx, ny, lx, ly, dx, dy, fx, fy, dim1, dim2;
        var a, b, crdx, crdy, eM11, eM12, eM21, eM22;
        var angle;
        var tmp_mat;
        var rotate_mat;

        dim1 = mat.height;
        dim2 = mat.width;

        angle = degree * (Math.PI / 180);
        console.log('angle', angle);

        if (angle == 0.0) {
            return mat;
        }

        eM11 = Math.cos(angle);
        eM12 = Math.sin(-angle);
        eM21 = Math.sin(angle);
        eM22 = Math.cos(angle);

        nx = parseInt(2 * Math.ceil((dim2 * eM11 + Math.abs(dim1 * eM12) - dim2) / 2));
        ny = parseInt(2 * Math.ceil((dim1 * eM11 + Math.abs(dim2 * eM12) - dim1) / 2));

        lx = parseInt(Math.floor((dim2 - 1) / 2));
        ly = parseInt(Math.floor((dim1 - 1) / 2));

        dx = parseInt(nx / 2);
        dy = parseInt(ny / 2);

        tmp_mat = new CPMat(dim2 + nx + 1, dim1 + ny + 1, 1);
        rotate_mat = new CPMat(mat.width, mat.height, mat.channel);


        for (i = dy; i < dy + dim1; i++) {
            for (j = dx; j < dx + dim2; j++) {
                tmp_mat.data[i * tmp_mat.width + j] = mat.data[(i - dy) * mat.width + j - dx];
            }
        }

        for (i = 0; i < dim1; i++) {
            for (j = 0; j < dim2; j++) {
                crdx = (j - lx - 1) * eM11 + (i - ly - 1) * eM12;
                crdy = (j - lx - 1) * eM21 + (i - ly - 1) * eM22;

                if (crdy < 0)
                    fy = parseInt(crdy) - 1;
                else
                    fy = parseInt(crdy); // floor-alternative
                if (crdx < 0)
                    fx = parseInt(crdx) - 1;
                else
                    fx = parseInt(crdx); // floor-alternative

                a = crdy - fy; // y-weights
                b = crdx - fx; // x-weights

                x = lx + dx + fx + 1;
                y = ly + dy + fy + 1;

                if (x >= 0 && x + 1 < tmp_mat.width && y >= 0 && y + 1 < tmp_mat.height) {
                    var temp = (1 - a) * (1 - b) * tmp_mat.data[y * tmp_mat.width + x] +
                        a * (1 - b) * tmp_mat.data[(y + 1) * tmp_mat.width + x] +
                        b * (1 - a) * tmp_mat.data[y * tmp_mat.width + x + 1] +
                        a * b * tmp_mat.data[(y + 1) * tmp_mat.width + x + 1];

                    temp = parseInt(temp);
                    if (temp > 255) {
                        temp = 255;
                    } else if (temp < 0) {
                        temp = 0;
                    }
                    //                    console.log(temp);
                    rotate_mat.data[i * rotate_mat.width + j] = temp;
                }
            }
        }

        return rotate_mat;
    }
};

module.exports = CPRotate;