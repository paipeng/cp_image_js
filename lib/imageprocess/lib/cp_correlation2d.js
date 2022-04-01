

class CPCorrelation2d {
    constructor(mat) {
        this.mat = mat;
    }

    /**
     * correlation  kernel without rotate
     * @param {*} kernel 
     * @param {*} kernel_size 
     * @returns 
     */
    filter(kernel, kernel_size) {
        var i, j, k, l;
        var temp;
        var m, n;

        m = (kernel_size - 1) % 2;
        n = (kernel_size - 1) / 2;
        let outputArrayData = new Float32Array(this.mat.width * this.mat.height).fill(0);

        for (i = 0; i < this.mat.height; i++) {
            for (j = 0; j < this.mat.width; j++) {
                temp = 0;
                for (k = 0; k < kernel_size; k++) {
                    for (l = 0; l < kernel_size; l++) {
                        if (i + k - n >= 0 && j + l - n >= 0 && i + k - n < this.mat.height && j + l - n < this.mat.width) {
                            temp += this.mat.data[(i + k - n) * this.mat.width + (j + l - n)] * kernel[(kernel_size - k - 1) * kernel_size + (kernel_size - l - 1)];
                        }
                    }
                }
                outputArrayData[i * this.mat.width + j] = temp / (kernel_size * kernel_size);
            }
        }
        return {
            width: this.mat.width,
            height: this.mat.height,
            channel: 1,
            data: outputArrayData
        };
    }

    filterInt(kernel, kernel_size) {
        var i, j, k, l;
        var temp;
        var m, n;

        m = (kernel_size - 1) % 2;
        n = (kernel_size - 1) / 2;
        let outputArrayData = new Uint8Array(this.mat.width * this.mat.height).fill(0);

        for (i = 0; i < this.mat.height; i++) {
            for (j = 0; j < this.mat.width; j++) {
                temp = 0;
                for (k = 0; k < kernel_size; k++) {
                    for (l = 0; l < kernel_size; l++) {
                        if (i + k - n >= 0 && j + l - n >= 0 && i + k - n < this.mat.height && j + l - n < this.mat.width) {
                            temp += this.mat.data[(i + k - n) * this.mat.width + (j + l - n)] * kernel[(kernel_size - k - 1) * kernel_size + (kernel_size - l - 1)];
                        }
                    }
                }
                outputArrayData[i * this.mat.width + j] = parseInt(temp / (kernel_size * kernel_size));
                if (outputArrayData[i * this.mat.width + j] < 0) {
                    outputArrayData[i * this.mat.width + j] = 0;
                } else if (outputArrayData[i * this.mat.width + j] > 255) {
                    outputArrayData[i * this.mat.width + j] = 255;
                }

            }
        }
        return {
            width: this.mat.width,
            height: this.mat.height,
            channel: 1,
            data: outputArrayData
        };
    }
};


module.exports = CPCorrelation2d;