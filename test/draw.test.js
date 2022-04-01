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

