var CPPoint = require('../mat/cp_point');
var CPLine = require('../mat/cp_line');

var { log } = require('../log/cp_log');


class CPDraw {
    constructor() {
    }

    /**
     * 
     * @param {*} mat 
     * @param {CPPoint} points 
     * @param {*} color 
     */
    drawPoints(mat, points, color) {
        for (var i in points) {
            if (points[i].x >= 0 && points[i].x < mat.width && points[i].y >= 0 && points[i].y < mat.height) {
                mat.data[points[i].y * mat.width * mat.channel + points[i].x * mat.channel] = color & 0xFF;
                if (mat.channel > 1) {
                    mat.data[points[i].y * mat.width * mat.channel + points[i].x * mat.channel + 1] = (color >> 8) & 0xFF;
                    mat.data[points[i].y * mat.width * mat.channel + points[i].x * mat.channel + 2] = (color >> 16) & 0xFF;
                }
            }
        }
    }

    /**
     * 
     * @param {*} mat 
     * @param {CPLine} line 
     */
    drawLine(mat, line, color = 0x00) {
        log.printLine(line);
        var min_point = line.getMinPoint();
        var max_point = line.getMaxPoint();

        if (min_point.x < 0 || max_point.x > mat.width || min_point.y < 0 || max_point.y > mat.height) {
            return;
        }
        if (line.start.x == line.end.x && line.start.y == line.end.y) {
            mat.data[line.start.y * mat.width * mat.channel + line.start.x * mat.channel] = color & 0xFF;
            if (mat.channel > 1) {
                mat.data[line.start.y * mat.width * mat.channel + line.start.x * mat.channel + 1] = (color >> 8) & 0xFF;
                mat.data[line.start.y * mat.width * mat.channel + line.start.x * mat.channel + 2] = (color >> 16) & 0xFF;
            }
            return;
        }

        mat.data[line.start.y * mat.width * mat.channel + line.start.x * mat.channel] = color & 0xFF;
        if (mat.channel > 1) {
            mat.data[line.start.y * mat.width * mat.channel + line.start.x * mat.channel + 1] = (color >> 8) & 0xFF;
            mat.data[line.start.y * mat.width * mat.channel + line.start.x * mat.channel + 2] = (color >> 16) & 0xFF;
        }
        mat.data[line.end.y * mat.width * mat.channel + line.end.x * mat.channel] = color & 0xFF;
        if (mat.channel > 1) {
            mat.data[line.end.y * mat.width * mat.channel + line.end.x * mat.channel + 1] = (color >> 8) & 0xFF;
            mat.data[line.end.y * mat.width * mat.channel + line.end.x * mat.channel + 2] = (color >> 16) & 0xFF;
        }

        if (min_point.x == max_point.x) {
            for (var i = min_point.y + 1; i < max_point.y; i++) {
                mat.data[i * mat.width * mat.channel + line.end.x * mat.channel] = color & 0xFF;
                if (mat.channel > 1) {
                    mat.data[i * mat.width * mat.channel + line.end.x * mat.channel + 1] = (color >> 8) & 0xFF;
                    mat.data[i * mat.width * mat.channel + line.end.x * mat.channel + 2] = (color >> 16) & 0xFF;
                }
            }
        } else if (min_point.y == max_point.y) {
            for (var j = min_point.x + 1; j < max_point.x; j++) {
                mat.data[line.end.y * mat.width * mat.channel + j * mat.channel] = color & 0xFF;
                if (mat.channel > 1) {
                    mat.data[line.end.y * mat.width * mat.channel + j * mat.channel + 1] = (color >> 8) & 0xFF;
                    mat.data[line.end.y * mat.width * mat.channel + j * mat.channel + 2] = (color >> 16) & 0xFF;
                }
            }
        } else {
            var offset = 0;
            var k = (max_point.y - min_point.y) * 1.0 / (max_point.x - min_point.x);
            if (k > 0) {
                offset = 0.5;
            } else {
                offset = -0.5;
            }
            if (Math.abs(k) < 1) {
                for (var j = min_point.x + 1; j < max_point.x; j++) {
                    mat.data[(min_point.y + parseInt((j - min_point.x) * k + offset)) * mat.width * mat.channel + j * mat.channel] = color & 0xFF;
                    if (mat.channel > 1) {
                        mat.data[(min_point.y + parseInt((j - min_point.x) * k + offset)) * mat.width * mat.channel + j * mat.channel + 1] = (color >> 8) & 0xFF;
                        mat.data[(min_point.y + parseInt((j - min_point.x) * k + offset)) * mat.width * mat.channel + j * mat.channel + 2] = (color >> 16) & 0xFF;
                    }
                }
            } else {
                if (min_point.y < max_point.y) {
                    for (var j = min_point.y + 1; j < max_point.y; j++) {
                        mat.data[j * mat.width * mat.channel + (min_point.x + 1 + parseInt((j - min_point.y) / k - offset)) * mat.channel] = color & 0xFF;
                        if (mat.channel > 1) {
                            mat.data[j * mat.width * mat.channel + (min_point.x + 1 + parseInt((j - min_point.y) / k - offset)) * mat.channel + 1] = (color >> 8) & 0xFF;
                            mat.data[j * mat.width * mat.channel + (min_point.x + 1 + parseInt((j - min_point.y) / k - offset)) * mat.channel + 2] = (color >> 16) & 0xFF;
                        }
                    }
                } else {
                    for (var j = max_point.y + 1; j < min_point.y; j++) {
                        mat.data[j * mat.width * mat.channel + (max_point.x - 1 + parseInt((j - max_point.y) / k - offset)) * mat.channel] = color & 0xFF;
                        if (mat.channel > 1) {
                            mat.data[j * mat.width * mat.channel + (max_point.x - 1 + parseInt((j - max_point.y) / k - offset)) * mat.channel + 1] = (color >> 8) & 0xFF;
                            mat.data[j * mat.width * mat.channel + (max_point.x - 1 + parseInt((j - max_point.y) / k - offset)) * mat.channel + 2] = (color >> 16) & 0xFF;
                        }
                    }
                }
            }
        }
    }

    drawPolygon(mat, points, color) {
        var len = points.length;
        for (var i in points) {
            i = parseInt(i);
            this.drawLine(mat, new CPLine(points[i], points[(i + 1) % len]), color);
        }
    }

};


module.exports = CPDraw;