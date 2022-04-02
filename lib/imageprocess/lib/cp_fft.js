
var CPComplex = require('../../mat/cp_complex')
var CPMat = require('../../mat/cp_mat');

class CPFFT {
    constructor() {

    }

    fft1(array) {
        var n = array.length;
        console.log(n, array);

        // base case
        if (n == 1) {
            var ret = [];
            ret.push(array[0]);
            console.log(ret);
            return ret;
        }

        // radix 2 Cooley-Tukey FFT

        if (n % 2 != 0) {
            return null;
        }

        // fft of even terms
        var even = new Array(n / 2);
        for (var k = 0; k < n / 2; k++) {
            even[k] = array[2 * k];
        }
        var q = this.fft1(even);
        console.log('q', q);

        // fft of odd terms
        var odd = even;  // reuse the array
        for (var k = 0; k < n / 2; k++) {
            odd[k] = array[2 * k + 1];
        }
        var r = this.fft1(odd);

        // combine
        var y = new Array(n);
        for (var k = 0; k < n / 2; k++) {
            var kth = -2 * k * Math.PI / n;
            var wk = new CPComplex(Math.cos(kth), Math.sin(kth));
            y[k] = q[k].plus(wk.times(r[k]));
            y[k + n / 2] = q[k].minus(wk.times(r[k]));
        }
        return y;
    }
    fft2(m) {
        var w = m.length;
        var h = m[0].length;
        console.log('w/h', w, h);

        var output = new Array(h).fill(0).map(() => new Array(w).fill(0));
        var row = new Array(h).fill(0);
        var col = new Array(w).fill(0);

        for (var j = 0; j < h; j++) {
            for (var i = 0; i < w; i++) {
                row[i] = m[i][j];
            }
            row = this.fft1(row);
            for (var i = 0; i < w; i++)
                output[i][j] = row[i];
        }
        for (var i = 0; i < w; i++) {
            for (var j = 0; j < h; j++) {
                col[j] = output[i][j];
            }
            col = this.fft1(col);
            for (var j = 0; j < h; j++)
                output[i][j] = col[j];
        }
        return output;
    }

    ifft1(x) {
        var n = x.length;
        var y = new Array(n);

        // take conjugate
        for (var i = 0; i < n; i++) {
            y[i] = x[i].conjugate();
        }
        // compute forward FFT
        y = this.fft1(y);
        // take conjugate again
        for (var i = 0; i < n; i++) {
            y[i] = y[i].conjugate();
        }
        // divide by n
        for (var i = 0; i < n; i++) {
            y[i] = y[i].scale(1.0 / n);
        }
        return y;
    }

    ifft2(m) {
        var w = m.length;
        var h = m[0].length;
        var output = new Array(h).fill(0).map(() => new Array(w).fill(0));
        var row = new Array(w);
        var col = new Array(h);

        for (var j = 0; j < h; j++) {
            for (var i = 0; i < w; i++) {
                row[i] = m[i][j];
            }
            row = this.ifft1(row);
            for (var i = 0; i < w; i++)
                output[i][j] = row[i];
        }
        for (var i = 0; i < w; i++) {
            for (var j = 0; j < h; j++) {
                col[j] = output[i][j];
            }
            col = this.ifft1(col);
            for (var j = 0; j < h; j++)
                output[i][j] = col[j];
        }

        return output;
    }

    convertToCPComplexArray(points) {
        var complexs = [];
        for (var i = 0; i < points.length; i++) {
            var complex = new CPComplex(points[i], 0);
            complexs.push(complex);
        }
        return complexs;
    }

    convertToCPComplexArray2D(points) {
        var complexs = [];
        for (var i = 0; i < points.length; i++) {
            var row = new Array(points[0].length);
            for (var j = 0; j < points[0].length; j++) {
                var complex = new CPComplex(points[i][j], 0);
                row[j] = complex;
            }
            complexs.push(row);
        }
        return complexs;
    }
};

module.exports = CPFFT;