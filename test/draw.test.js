var { CPLine, CPPoint, matUtil, CPUtil, CPDraw } = require("../index");


var points = [
];




test('draw line', () => {
    points.push(new CPPoint(207, 184));
    points.push(new CPPoint(393, 60));

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

