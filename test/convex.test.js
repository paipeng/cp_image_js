
var cp_image = require("../index");
var { CPLine, CPPoint, matUtil, CPUtil, CPDraw, CpConvexHull } = require("../index");

var points = [
    { x: 207, y: 184 },
    { x: 393, y: 60 },
    { x: 197, y: 158 },
    { x: 197, y: 114 },
    { x: 128, y: 261 },
    { x: 442, y: 40 },
    { x: 237, y: 159 },
    { x: 338, y: 75 },
    { x: 194, y: 93 },
    { x: 33, y: 159 },
    { x: 393, y: 152 },
    { x: 433, y: 267 },
    { x: 324, y: 141 },
    { x: 384, y: 183 },
    { x: 273, y: 165 },
    { x: 250, y: 257 },
    { x: 423, y: 198 },
    { x: 227, y: 68 },
    { x: 120, y: 184 },
    { x: 214, y: 49 },
    { x: 256, y: 75 },
    { x: 379, y: 93 },
    { x: 312, y: 49 },
    { x: 471, y: 187 },
    { x: 366, y: 122 }
]

test('convex hull', () => {
    var convexHull = new CpConvexHull();
    // Add a couple sample points to the array
    // Sort the points by X, then by Y (required by the algorithm)
    points.sort(convexHull.sortPointY);
    points.sort(convexHull.sortPointX);

    console.log(points);

    var hullPoints = convexHull.hull(points);

    console.log('hullPoints', hullPoints);


    var cpUtil = new cp_image.CPUtil();
    var maxX = cpUtil.getMaxX(points);

    var maxY = cpUtil.getMaxY(points);
    console.log('maxX', maxX, maxY);
    var mat = cp_image.matUtil.createMat(maxX + 20, maxY + 20, 3);

    var cpDraw = new cp_image.CPDraw();
    cpDraw.drawPoints(mat, points, 0);
    cpDraw.drawPolygon(mat, hullPoints, 0x000000);

    cp_image.matUtil.writeBmpMat('./output/convex_rgb.bmp', mat);
});




