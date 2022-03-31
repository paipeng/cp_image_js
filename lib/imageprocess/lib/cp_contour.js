
//var log = require("../../log/cp_log");

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

    //log.text.print('start: ' + start_x + '-' + start_y + '\n');
    return this.followContour({ x: start_x, y: start_y });
};

CpContour.prototype.followContour = function (startPoint) {
    //console.log("followContour @", startPoint);
    var points = []; // start new contour
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
            //console.log("      neighbor index: ",nIndex);
            var nIndex = index + neighborhood[i].offs * 3;
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


CpContour.prototype.getCenter = function (points) {
    // get center point
    var sum_x = 0, sum_y = 0;
    for (var point of points) {
        sum_x += point.x;
        sum_y += point.y;
    }
    var center_x = sum_x / points.length;
    var center_y = sum_y / points.length;
    return {
        x: center_x,
        y: center_y
    };
};

CpContour.prototype.getShape = function (points) {
    // get top bottom left right (max)
    // max
    var top = -1, bottom = -1, left = -1, right = -1;
    for (var point of points) {
        if (point.x < left || left == -1) {
            left = point.x;
        }
        if (point.x > right || right == -1) {
            right = point.x;
        }
        if (point.y < top || top == -1) {
            top = point.y;
        }
        if (point.y > bottom || bottom == -1) {
            bottom = point.y;
        }
    }


    return {
        top: top,
        left: left,
        right: right,
        bottom: bottom
    };
};


CpContour.prototype.getAvgShape = function (points) {
    var center = this.getCenter(points);
    var rect = this.getShape(points);

    // avg
    var avg_top = 0, avg_bottom = 0, avg_left = 0, avg_right = 0;
    var avg_top_count = 0, avg_bottom_count = 0, avg_left_count = 0, avg_right_count = 0;

    for (var point of points) {
        if (point.y < center.y && point.x > rect.left * 1.1 && point.x < rect.right * 0.9) {
            avg_top_count++;
            avg_top += point.y;
        } else if (point.y > center.y && point.x > rect.left * 1.1 && point.x < rect.right * 0.9) {
            avg_bottom_count++;
            avg_bottom += point.y;
        }
        if (point.x < center.x && point.y > rect.top * 1.1 && point.y < rect.bottom * 0.9) {
            avg_left_count++;
            avg_left += point.x;
        } else if (point.x > center.x && point.y > rect.top * 1.1 && point.y < rect.bottom * 0.9) {
            avg_right_count++;
            avg_right += point.x;
        }
    }

    if (avg_top_count > 0) {
        avg_top = parseInt(avg_top / avg_top_count);
    } else {
        avg_top = 0;
    }

    if (avg_bottom_count > 0) {
        avg_bottom = parseInt(avg_bottom / avg_bottom_count);
    } else {
        avg_bottom = 0;
    }

    if (avg_left_count > 0) {
        avg_left = parseInt(avg_left / avg_left_count);
    } else {
        avg_left = 0;
    }

    if (avg_right_count > 0) {
        avg_right = parseInt(avg_right / avg_right_count);
    } else {
        avg_right = 0;
    }


    return {
        top: avg_top,
        left: avg_left,
        right: avg_right,
        bottom: avg_bottom
    };

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
