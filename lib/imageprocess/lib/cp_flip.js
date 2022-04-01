
var CPMat = require('../../mat/cp_mat');

class CPFlip {
    constructor() {

    }

    /**
     * 
     * @param {CPMat} mat 
     */
    horizontal(mat) {
        //var horizontalMat = new CPMat(mat.width, mat.height, mat.channel);
        var temp;
        for (var j = 0; j < mat.height; j++) {
            for (var i = 0; i < mat.width / 2; i++) {
                temp = mat.data[j * mat.width + i];
                mat.data[j * mat.width + i] = mat.data[j * mat.width + mat.width - i - 1];
                mat.data[j * mat.width + mat.width - i - 1] = temp;
            }
        }
    }

    vertical(mat) {
        var temp;
        for (var j = 0; j < parseInt(mat.height / 2); j++) {
            for (var i = 0; i < mat.width; i++) {
                temp = mat.data[j * mat.width + i];
                mat.data[j * mat.width + i] = mat.data[(mat.height - j - 1) * mat.width + i];
                mat.data[(mat.height - j - 1) * mat.width + i] = temp;
            }
        }
    }
};


module.exports = CPFlip;