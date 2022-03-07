function CPLabel(mat) {
    this.mat = mat;
}

CPLabel.prototype.hasConnectedLabel = function (labelData, width, x, y) {
    var min = 0;
    if (labelData[x - 1 + y * width] == 0 || labelData[x - 1 + (y - 1) * width] == 0 || labelData[x + (y - 1) * width] == 0 || labelData[x + 1 + (y - 1) * width] == 0 ||
        labelData[x + 1 + y * width] == 0 || labelData[x + 1 + (y + 1) * width] == 0 || labelData[x + (y + 1) * width] == 0 || labelData[x - 1 + (y + 1) * width] == 0
    ) {

        min = 255;
    }
    return min;

}

CPLabel.prototype.label = function (startPoint) {
    console.log('label', startPoint);
    var labelData = new Uint8Array(this.mat.width * this.mat.height);
    for (var i = 0; i < this.mat.width * this.mat.height; i++) {
        labelData[i] = 255;
    }
    points = []; // start new label
    points.push(startPoint);
    labelData[startPoint.y * this.mat.width + startPoint.x] = 0;

    // right-bottom
    for (var i = startPoint.y; i < this.mat.height - 1; i++) {
        for (var j = startPoint.x; j < this.mat.width - 1; j++) {
            if (this.mat.data[i * this.mat.width + j] == 0 && this.hasConnectedLabel(labelData, this.mat.width, j, i) > 0) {
                var newPoint = { x: j, y: i };
                labelData[i * this.mat.width + j] = 0;
                points.push(newPoint);
            } else {
                //console.log(this.mat.data[i * this.mat.width + j]);
            }
        }
    }

    // right-top
    for (var i = startPoint.y; i >= 1; i--) {
        for (var j = startPoint.x; j < this.mat.width - 1; j++) {
            if (this.mat.data[i * this.mat.width + j] == 0 && this.hasConnectedLabel(labelData, this.mat.width, j, i) > 0) {
                var newPoint = { x: j, y: i };
                labelData[i * this.mat.width + j] = 0;
                points.push(newPoint);
            } else {
                //console.log(this.mat.data[i * this.mat.width + j]);
            }
        }
    }

    // left-top
    for (var i = startPoint.y; i >= 1; i--) {
        for (var j = startPoint.x; j > 1; j--) {
            if (this.mat.data[i * this.mat.width + j] == 0 && this.hasConnectedLabel(labelData, this.mat.width, j, i) > 0) {
                var newPoint = { x: j, y: i };
                labelData[i * this.mat.width + j] = 0;
                points.push(newPoint);
            } else {
                //console.log(this.mat.data[i * this.mat.width + j]);
            }
        }
    }

    // left-bottom
    for (var i = startPoint.y; i < this.mat.height - 1; i++) {
        for (var j = startPoint.x; j > 1; j--) {
            if (this.mat.data[i * this.mat.width + j] == 0 && this.hasConnectedLabel(labelData, this.mat.width, j, i) > 0) {
                var newPoint = { x: j, y: i };
                labelData[i * this.mat.width + j] = 0;
                points.push(newPoint);
            } else {
                //console.log(this.mat.data[i * this.mat.width + j]);
            }
        }
    }

    //console.log(points);

    return {
        width: this.mat.width,
        height: this.mat.height,
        channel: 1,
        data: labelData
    };
};


module.exports = function (mat) {
    var label = new CPLabel(mat);
    return label;
};
