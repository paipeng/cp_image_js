var CPPoint = require('./cp_point');


class CPLine {
    /**
     * 
     * @param {CPPoint} start 
     * @param {CPPoint} end
     */
    constructor(start = new CPPoint(), end = new CPPoint()) {
        this.start = start;
        this.end = end;
    }

    getMinPoint() {
        if (this.start.x > this.end.x && this.start.y > this.end.y) {
            return this.end;
        } else if (this.start.x < this.end.x && this.start.y < this.end.y) {
            return this.start;
        } else if (this.start.y == this.end.y) {
            if (this.start.x > this.end.x) {
                this.end;
            } else {
                return this.start;
            }
        } else if (this.start.x == this.end.x) {
            if (this.start.y > this.end.y) {
                return this.end;
            } else {
                return this.start;
            }
        } else {
            if (this.start.x > this.end.x) {
                return this.end;
            } else {
                return this.start;
            }
        }
    }


    getMaxPoint() {
        if (this.start.x > this.end.x && this.start.y > this.end.y) {
            return this.start;
        } else if (this.start.x < this.end.x && this.start.y < this.end.y) {
            return this.end;
        } else if (this.start.y == this.end.y) {
            if (this.start.x > this.end.x) {
                this.start;
            } else {
                return this.end;
            }
        } else if (this.start.x == this.end.x) {
            if (this.start.y > this.end.y) {
                return this.start;
            } else {
                return this.end;
            }
        } else {
            if (this.start.x > this.end.x) {
                return this.start;
            } else {
                return this.end;
            }
        }
    }
};


module.exports = CPLine;