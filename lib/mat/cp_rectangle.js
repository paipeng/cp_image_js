
var CPPoint = require('./cp_point');


class CPRectangle {
    /**
     * 
     * @param {CPPoint} start 
     * @param {CPPoint} end
     */
    constructor(start = new CPPoint(), end = new CPPoint()) {
        this.start = start;
        this.end = end;
    }

};


module.exports = CPRectangle;