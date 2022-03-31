var histogram = require('./cp_histogram');

function CPThreshold(mat) {
    this.mat = mat;
    var crop_factor = 0.7;

    var rect = {
        top: parseInt((mat.height - mat.width * crop_factor) / 2),
        bottom: parseInt((mat.height - mat.width * crop_factor) / 2 + mat.width * crop_factor),
        left: parseInt(mat.width * (1 - crop_factor) / 2),
        right: parseInt(mat.width * ((1 - crop_factor) / 2 + crop_factor)),
    };
    this.histogram = histogram(this.mat).histogramInRect(rect);
}


CPThreshold.prototype.bimodal_test = function (y) {
    var len = y.length;
    var modes = 0;

    for (var k = 1; k < len - 1; k++) {
        if (y[k - 1] < y[k] && y[k + 1] < y[k]) {
            modes++;
            if (modes > 2)
                return false;
        }
    }
    return (modes == 2);
}

CPThreshold.prototype.minimum = function () {
    var iter = 0;
    var max = -1;
    var iHisto;
    var tHisto;


    iHisto = new Float64Array(this.histogram.length).fill(0);;
    tHisto = new Float64Array(this.histogram.length).fill(0);;
    var y = iHisto;

    for (var i = 0; i < this.histogram.length; i++) {
        iHisto[i] = this.histogram[i];
        if (this.histogram[i] > 0)
            max = i;
    }

    while (!this.bimodal_test(iHisto)) {
        for (var i = 1; i < this.histogram.length - 1; i++)
            tHisto[i] = (iHisto[i - 1] + iHisto[i] + iHisto[i + 1]) / 3;
        tHisto[0] = (iHisto[0] + iHisto[1]) / 3;
        tHisto[this.histogram.length - 1] = (iHisto[this.histogram.length - 2] + iHisto[this.histogram.length - 1]) / 3;

        for (var i = 0; i < this.histogram.length; i++) {
            iHisto[i] = tHisto[i];
        }

        iter++;
        if (iter > 10000) {
            console.log(errMsg);
            return -1;
        }
    }

    for (var k = 1; k < max; k++) {
        if (y[k - 1] > y[k] && y[k + 1] >= y[k])
            return k;
    }

    return -1;

};

CPThreshold.prototype.A = function (y, j) {
    var x = 0;
    for (var i = 0; i <= j; i++)
        x += y[i];
    return x;
}


CPThreshold.prototype.B = function (y, j) {
    var x = 0;
    for (var i = 0; i <= j; i++)
        x += y[i] * i;
    return x;
}

CPThreshold.prototype.C = function (y, j) {
    var x = 0;
    for (var i = 0; i <= j; i++)
        x += y[i] * i * i;
    return x;
}

CPThreshold.prototype.indices = function (n) {
    var indices = new Float64Array(n);
    for (var i = 0; i < n; i++)
        indices[i] = i;
    return indices;
}
CPThreshold.prototype.sqr = function (_in, out) {
    for (var i = 0; i < _in.length; i++)
        out[i] = _in[i] * _in[i];

    return out;
}

CPThreshold.prototype.mul = function (row, col) {
    var sum = 0;
    for (var i = 0; i < row.length; i++) {
        sum += row[i] * col[i];
    }
    return sum;
}


CPThreshold.prototype.minus = function (num, phi, gamma) {
    for (var i = 0; i < phi.length; i++) {
        gamma[i] = num - phi[i];
    }
    return gamma;
}

CPThreshold.prototype.scale = function (list1, list2, output) {
    for (var i = 0; i < list1.length; i++)
        output[i] = list1[i] * list2[i];

    return output;
}

CPThreshold.prototype.maxlike = function () {
    var n = this.histogram.length - 1;
    var y = this.histogram;


    var T = this.minimum();
    //console.log('minimum threshold: ', T);
    if (T < 0) {
        return 0;
    }


    var eps = 0.0000001;

    var mu = this.B(y, T) / this.A(y, T);
    var nu = (this.B(y, n) - this.B(y, T)) / (this.A(y, n) - this.A(y, T));
    var p = this.A(y, T) / this.A(y, n);
    var q = (this.A(y, n) - this.A(y, T)) / this.A(y, n);
    var sigma2 = this.C(y, T) / this.A(y, T) - (mu * mu);
    var tau2 = (this.C(y, n) - this.C(y, T)) / (this.A(y, n) - this.A(y, T)) - (nu * nu);

    if (sigma2 == 0 || tau2 == 0)
        return 0;

    var mu_prev = 0;
    var nu_prev = 0;
    var p_prev = 0;
    var q_prev = 0;
    var sigma2_prev = 0;
    var tau2_prev = 0;

    var ind = this.indices(n + 1);
    var ind2 = new Float64Array(n + 1);
    var phi = new Float64Array(n + 1);
    var gamma = new Float64Array(n + 1);
    var tmp1 = new Float64Array(n + 1);
    var tmp2 = new Float64Array(n + 1);
    var tmp3 = new Float64Array(n + 1);
    var tmp4 = new Float64Array(n + 1);

    ind2 = this.sqr(ind, ind2);

    var attempts = 0;
    while (true) {
        if (attempts++ > 10000) {
            return 0;
        }
        for (var i = 0; i <= n; i++) {
            var dmu2 = (i - mu) * (i - mu);
            var dnu2 = (i - nu) * (i - nu);
            phi[i] = p / Math.sqrt(sigma2) * Math.exp(-dmu2 / (2 * sigma2)) / (p / Math.sqrt(sigma2) * Math.exp(-dmu2 / (2 * sigma2)) + (q / Math
                .sqrt(tau2)) * Math.exp(-dnu2 / (2 * tau2)));
        }

        gamma = this.minus(1, phi, gamma);
        var F = this.mul(phi, y);
        var G = this.mul(gamma, y);
        p_prev = p;
        q_prev = q;
        mu_prev = mu;
        nu_prev = nu;
        sigma2_prev = nu;
        tau2_prev = nu;
        var Ayn = this.A(y, n);
        p = F / Ayn;
        q = G / Ayn;
        tmp1 = this.scale(ind, phi, tmp1);
        mu = this.mul(tmp1, y) / F;
        tmp2 = this.scale(ind, gamma, tmp2);
        nu = this.mul(tmp2, y) / G;
        tmp3 = this.scale(ind2, phi, tmp3);
        sigma2 = this.mul(tmp3, y) / F - (mu * mu);
        tmp4 = this.scale(ind2, gamma, tmp4);
        tau2 = this.mul(tmp4, y) / G - (nu * nu);

        if (Math.abs(mu - mu_prev) < eps)
            break;
        if (Math.abs(nu - nu_prev) < eps)
            break;
        if (Math.abs(p - p_prev) < eps)
            break;
        if (Math.abs(q - q_prev) < eps)
            break;
        if (Math.abs(sigma2 - sigma2_prev) < eps)
            break;
        if (Math.abs(tau2 - tau2_prev) < eps)
            break;
    }

    if (sigma2 == 0 || tau2 == 0)
        return 0;

    var w0 = 1 / sigma2 - 1 / tau2;
    var w1 = mu / sigma2 - nu / tau2;
    var w2 = (mu * mu) / sigma2 - (nu * nu) / tau2 + Math.log10((sigma2 * (q * q)) / (tau2 * (p * p)));

    var sqterm = w1 * w1 - w0 * w2;
    if (sqterm < 0) {
        return 0;
    }

    return Math.floor((w1 + Math.sqrt(sqterm)) / w0);
};



module.exports = function (mat) {
    var threshold = new CPThreshold(mat);
    return threshold;
};
