
var log = require("../log/cp_log");

function CpContour(mat) {
    this.mat = mat;
    this.maxContourPoints = 500 * 10;
    this.allContours = [];
    this.pixels = mat.data;
}
/**
 * Moore-Neighbor tracing
 */
CpContour.prototype.findContour = function () {
    // find star pixel
    var start_x = -1, start_y = -1;

    for (var i = this.mat.height - 1; i >= 0; i--) {
        for (var j = 0; j < this.mat.width; j++) {
            if (this.mat.data[i * this.mat.width * this.mat.channel + j] == 0) {
                start_x = j;
                start_y = i;
                break;
            }
        }
        if (start_x != -1 && start_y != -1) {
            break;
        }
    }

    log.text.print('start: ' + start_x + '-' + start_y + '\n');
    return this.followContour({ x: start_x, y: start_y });
};

CpContour.prototype.followContour = function (startPoint) {
    console.log("followContour @", startPoint);
    points = []; // start new contour
    points.push(startPoint);
    var w = this.mat.width;
    var h = this.mat.height;

    var point = startPoint;
    var numPoints = 0;

    var neighborhood = [
        { xd: -1, yd: 0, offs: -1, next: 7 }, // west
        { xd: -1, yd: -1, offs: -w - 1, next: 0 }, // north-west
        { xd: 0, yd: -1, offs: -w, next: 1 }, // north
        { xd: 1, yd: -1, offs: -w + 1, next: 2 }, // north-east
        { xd: 1, yd: 0, offs: 1, next: 3 }, // east
        { xd: 1, yd: 1, offs: w + 1, next: 4 }, // south-east
        { xd: 0, yd: 1, offs: w, next: 5 }, // south
        { xd: -1, yd: 1, offs: w - 1, next: 6 }  // south-west
    ];

    var prevIndex;
    var nextNeighbor = 0; // starting point for neighborhood search (index for neighborhood array)
    do {
        //console.log("  point: ",point.x,point.y);
        // go clockwise trough neighbors  
        var index = point.x + point.y * w;
        this.pixels[index] = 0; // r
        this.pixels[index + 2] = 0; // b
        var newPoint = {};
        //console.log("  index: ",index);
        var i = nextNeighbor;
        //console.log("    nextNeighbor: ",nextNeighbor);
        for (var j = 0; j < neighborhood.length; j++) {

            //console.log("    neighbor: ",i);
            var nIndex = index + neighborhood[i].offs * 4;
            //console.log("      neighbor index: ",nIndex);
            //console.log("      neighbor g index: ",nIndex+1);
            //console.log("      value: ",this.pixels[nIndex+1]);
            // todo: check if in range
            if (this.pixels[nIndex + 1] == 0 && nIndex != prevIndex) {
                //console.log("      == fColor");
                newPoint = { x: point.x + neighborhood[i].xd, y: point.y + neighborhood[i].yd };
                nextNeighbor = neighborhood[i].next;
                break;
            }
            i++;
            i = i % neighborhood.length;
        }
        if (newPoint == undefined) {
            break;
        } else {
            //console.log("      new point: ",newPoint[0],newPoint[1]);
            point = newPoint;
            points.push(point);
            //console.log("      points: ",this.getPoints(points));
        }
        prevIndex = index;
        //var index = y*w*4+x*4; 
        numPoints++;
        //console.log(point[0],startPoint[0],"  ",point[1],startPoint[1]);

    } while (!(point.x == startPoint.x && point.y == startPoint.y) && numPoints < this.maxContourPoints);

    this.closeContour(points);
    //console.log(points);
    return points;
};

CpContour.prototype.closeContour = function (points) {
    //console.log("pixels: ",this.pixels);
};
CpContour.prototype.getPoints = function (points) {
    var log = "";
    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        log += point.x + "," + point.y + " > ";
    }
    return log;
};

module.exports = function (mat) {
    var contour = new CpContour(mat);
    return contour;
};
