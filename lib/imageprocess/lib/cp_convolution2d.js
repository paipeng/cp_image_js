class CPConvolution2d {
    constructor(mat) {
        this.mat = mat;
    }

    filter(rect, kernel_size) {
        let outputArrayData = new Float32Array((rect.right - rect.left) * (rect.bottom - rect.top)).fill(0);
        //console.log(this.mat);
        let i = 0, j = 0;
        let m, n;
        let tmp = 0.0;
        let f = 0.5;
        m = (kernel_size - 1) % 2;
        n = parseInt((kernel_size - 1) / 2);
        //console.log('m: ', m);
        //console.log('n: ', n);
        //console.log(rect);
        for (i = rect.top; i < rect.bottom; i++) {
            for (j = rect.left; j < rect.right; j++) {
                //console.log('i/j', i, j);
                tmp = 0.0;
                if ((i - n) >= 0 && (j - n) >= 0) {
                    tmp = this.mat.data[(i - n) * this.mat.width + (j - n)] * f;
                }
                if ((i + n + m) < this.mat.height && (j + n + m) < this.mat.width) {
                    tmp += this.mat.data[(i + m + n) * this.mat.width + (j + n + m)] * f;
                }
                if ((i + n + m) < this.mat.height && (j - n) >= 0) {
                    tmp -= this.mat.data[(i + m + n) * this.mat.width + (j - n)] * f;
                }
                if ((i - n) >= 0 && (j + n + m) < this.mat.width) {
                    tmp -= this.mat.data[(i - n) * this.mat.width + (j + n + m)] * f;
                }

                //console.log(tmp);
                //dst -> mtrx[i - y][j - x] = tmp;
                outputArrayData[(i - rect.top) * (rect.right - rect.left) + (j - rect.left)] = Math.abs(tmp);
            }
        }

        return {
            width: (rect.right - rect.left),
            height: (rect.bottom - rect.top),
            channel: 1,
            data: outputArrayData
        };
    }
};

module.exports = CPConvolution2d;
