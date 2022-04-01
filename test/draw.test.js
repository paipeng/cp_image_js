var { CPLine, CPPoint, matUtil, CPUtil, CPDraw } = require("../index");


var points = [
];

beforeEach(() => {
    points.push(new CPPoint(10, 10));
    points.push(new CPPoint(40, 10));
    points.push(new CPPoint(40, 40));
});

afterEach(() => {

});


test('draw line', () => {
    var cpUtil = new CPUtil();
    var maxX = cpUtil.getMaxX(points);
    var maxY = cpUtil.getMaxY(points);
    console.log('maxX', maxX, maxY);
    var mat = matUtil.createMat(maxX + 20, maxY + 20, 1);

    var cpDraw = new CPDraw();
    cpDraw.drawPoints(mat, points, 0);
    cpDraw.drawLine(mat, new CPLine(points[0], points[1]), 0);

    matUtil.writeBmpMat('./output/draw_line.bmp', mat);

});


test('draw polygon', () => {
    var cpUtil = new CPUtil();
    var maxX = cpUtil.getMaxX(points);
    var maxY = cpUtil.getMaxY(points);
    console.log('maxX', maxX, maxY);
    var mat = matUtil.createMat(maxX + 20, maxY + 20, 1);

    var cpDraw = new CPDraw();
    //cpDraw.drawPoints(mat, points, 0);
    cpDraw.drawPolygon(mat, points, 0);

    matUtil.writeBmpMat('./output/draw_polygon.bmp', mat);

});


test('draw polygon in color', () => {
    var cpUtil = new CPUtil();
    var maxX = cpUtil.getMaxX(points);
    var maxY = cpUtil.getMaxY(points);
    console.log('maxX', maxX, maxY);
    var mat = matUtil.createMat(maxX + 20, maxY + 20, 3);

    var cpDraw = new CPDraw();
    //cpDraw.drawPoints(mat, points, 0);
    cpDraw.drawPolygon(mat, points, 0xFF00FF);

    matUtil.writeBmpMat('./output/draw_polygon_rgb.bmp', mat);

});



test('draw hull polygon in color', () => {

    var hullPoints = [
        { x: 33, y: 159 },
        { x: 214, y: 49 },
        { x: 442, y: 40 },
        { x: 471, y: 187 },
        { x: 433, y: 267 },
        { x: 128, y: 261 },
        { x: 120, y: 184 }
    ];
    var cpUtil = new CPUtil();
    var maxX = cpUtil.getMaxX(hullPoints);
    var maxY = cpUtil.getMaxY(hullPoints);
    console.log('maxX', maxX, maxY);
    var mat = matUtil.createMat(maxX + 20, maxY + 20, 3);

    var cpDraw = new CPDraw();
    //cpDraw.drawPoints(mat, points, 0);
    cpDraw.drawPolygon(mat, hullPoints, 0x1FFF70);

    matUtil.writeBmpMat('./output/draw_hull_polygon_rgb.bmp', mat);

});

