class CPComplex {
    constructor(real = 0, imag = 0) {
        this.re = real; // the real part
        this.im = imag; // the imaginary part
    }

    abs() {
        return Math.hypot(this.re, this.im);
    }

    reciprocal() {
        var scale = this.re * this.re + this.im * this.im;
        return new CPComplex(this.re / scale, -this.im / scale);
    }

    /**
     * 
     * @param {CPComplex} b 
     * @returns 
     */
    divides(b) {
        var a = new CPComplex(re / b, im / b);
        return a;
    }

    /**
     * 
     * @param {CPComplex} b 
     * @returns 
     */
    plus(b) {
        var real = this.re + b.re;
        var imag = this.im + b.im;
        return new CPComplex(real, imag);
    }

    /**
     * 
     * @param {CPComplex} b 
     * @returns 
     */
    minus(b) {
        var real = this.re - b.re;
        var imag = this.im - b.im;
        return new CPComplex(real, imag);
    }

    /**
     * 
     * @param {CPComplex} b 
     * @returns 
     */
    times(b) {
        var real = this.re * b.re - this.im * b.im;
        var imag = this.re * b.im + this.im * b.re;
        return new CPComplex(real, imag);
    }

    /**
     * 
     * @param {number} alpha 
     * @returns 
     */
    scale(alpha) {
        return new CPComplex(alpha * this.re, alpha * this.im);
    }

    // return a new Complex object whose value is the conjugate of this
    conjugate() {
        return new CPComplex(this.re, -this.im);
    }
}
module.exports = CPComplex;