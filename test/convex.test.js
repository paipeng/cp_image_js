
var cp_image = require("../index");


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

test('string with a addition of two number', () => {

    var hullPoints = [];
    var hullPoints_size;
    // Add a couple sample points to the array
    // Sort the points by X, then by Y (required by the algorithm)
    points.sort(cp_image.imageprocess.convexHull().sortPointY);
    points.sort(cp_image.imageprocess.convexHull().sortPointX);

    console.log(points);
    // Calculate the convex hull
    // Takes: an (1) array of points with x() and y() methods defined
    //          (2) Size of the points array
    //          (3) Empty array to store the hull points
    // Returns: The number of hull points, which may differ the the hull points array’s size
    hullPoints_size = cp_image.imageprocess.convexHull().hull(points, points.length, hullPoints);

    console.log(hullPoints);
});




