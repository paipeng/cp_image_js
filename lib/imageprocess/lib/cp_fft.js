
var CPComplex = require('../../mat/cp_complex')
var CPMat = require('../../mat/cp_mat');

class CPFFT {
    constructor() {

    }

    fft1(array) {
        var n = array.length;
        console.log(n);

        // base case
        if (n == 1) {
            var ret = [];
            ret.push(array[0]);
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
    fft2(complex) {

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

    convertToCPComplexArray(points) {
        var complexs = [];
        for (var i = 0; i < points.length; i++) {
            var complex = new CPComplex(points[i], 0);
            complexs.push(complex);
        }
        return complexs;
    }
};

module.exports = CPFFT;