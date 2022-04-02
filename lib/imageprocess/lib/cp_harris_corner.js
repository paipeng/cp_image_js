var CPMat = require('../../mat/cp_mat');

class CPHarrisCorner {
    constructor() {

    }

    /**
     * 
     * @param {CPMat} mat 
     */
    findCorners(mat, endImgType) {
        var input = mat;
        var ix = new Array(mat.width * mat.height);
        var iy = new Array(mat.width * mat.height);
        var approx = new Array(mat.width * mat.height);

        // Loop over each pixel. Figure out letter locations
        var wid = mat.width;

        var n = mat.height * mat.width - 1;
        while (n--) {
            if (n % wid > 0)
                ix[n] = (input.data[n] - input.data[(n - 1)]);

            if (n >= wid)
                iy[n] = (input.data[n] - input.data[(n - wid)]);
        }

        if (endImgType == 3) {

            var m0, m1, m2, m3, u, v;
            var winSize = 3; // Half of window width and height in pixels.
            var kappa = 0.15;
            var winWid = winSize * 2 + 1;

            var arrWindow = new Array(winWid * winWid);

            // Determine scale factor.
            var scale = 0.0;
            for (var i = -winSize; i <= winSize; i++)
                for (var j = -winSize; j <= winSize; j++) {
                    scale = scale + this.windowf(i, j, winSize);
                }

            // Normalize window sum.
            for (var n = 0; n < arrWindow.length; n++) {
                u = n % winWid - winSize;
                v = Math.floor(n / winWid) - winSize;
                arrWindow[n] = this.windowf(u, v, winSize) / scale;
            }

            var x, y, tx, ty;
            for (var k = 0; k < ix.length; k++) {

                x = k % wid;
                y = Math.floor(k / wid);
                m0 = m1 = m2 = m3 = 0.0;

                //u = -winSize;
                //v = -winSize;
                for (var n = 0; n < arrWindow.length; n++) {

                    u = n % winWid - winSize;
                    v = Math.floor(n / winWid) - winSize;

                    if ((x + u >= 0) && (x + u <= mat.width - 1) &&
                        (y + v >= 0) && (y + v <= mat.height - 1)) {

                        tx = ix[x + u + wid * (y + v)];
                        ty = iy[x + u + wid * (y + v)];

                        m0 += arrWindow[n] * tx * tx;
                        m1 += arrWindow[n] * tx * ty;
                        m2 += arrWindow[n] * tx * ty;
                        m3 += arrWindow[n] * ty * ty;
                    }
                }

                // Harris:
                // M_c = a * d - b * c + kappa * (a + d)^2 // where kappa in range 0.04 -- 0.15.
                approx[k] = m0 * m3 - m1 * m2 - kappa * Math.pow(m0 + m3, 2);
            }
        }

        if (endImgType == 0) {
            return input;
        }
        else {

            var result;
            var intScale = 1;
            if (endImgType == 1) result = ix;
            if (endImgType == 2) result = iy;
            if (endImgType == 3) {
                intScale = 0.001;
                result = approx;
            }

            var n = result.length - 1;
            while (n--) {
                input.data[n] = Math.max(Math.min(Math.round(intScale * result[n]) + 128, 255), 0);
            }

            return input;
        }
    }

    windowf(u, v, winSize) {
        var x = Math.sqrt(u * u + v * v); // Distance.
        if (x > winSize) return 0;
        var c = winSize * 0.2; // Width.
        var a = 1.0 / (c * Math.sqrt(2.0 * Math.PI)); // Amplitude.
        return (a * Math.exp(- (x * x) / (2.0 * c * c))); // Gaussian.
    }
};


module.exports = CPHarrisCorner;