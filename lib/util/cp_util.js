
class CPUtil {
    constructor() {
    }

    /**
     * 
     * @param {array} points 
     */
    getMaxX(points) {
        var maxX = 0;
        for (var i in points) {
            //console.log(points[i]);
            if (maxX < points[i].x) {
                maxX = points[i].x;
            }
        }
        return maxX;
    }

    /**
     * 
     * @param {array} points 
     */
    getMaxY(points) {
        var maxY = 0;
        for (var i in points) {
            if (maxY < points[i].y) {
                maxY = points[i].y;
            }
        }
        return maxY;
    }
};


module.exports = CPUtil;