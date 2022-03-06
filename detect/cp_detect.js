
var log = require("../log/cp_log");
var bmp = require("../bmp/cp_bmp");
var imageProcess = require("../imageprocess/cp_imageprocess");


function CPDetect(mat) {
    this.mat = mat;
    this.crop_factor = 0.8;
    this.resize_factor = 0.4;
}

CPDetect.prototype.getCropRect = function (crop_factor) {
    return {
        x: parseInt(this.mat.width * ((1 - crop_factor) / 2)),
        y: parseInt(this.mat.height * ((1 - crop_factor) / 2)),
        width: parseInt(this.mat.width * crop_factor),
        height: parseInt(this.mat.height * crop_factor)
    };
}
CPDetect.prototype.detect = function (detectParam) {
    console.log('mat size: ' + this.mat.width + '-' + this.mat.height);
    // 1. crop
    var cropRect = this.getCropRect(detectParam.crop_factor);
    console.log(cropRect);
    var cropMat = imageProcess.crop(this.mat).cropRect(cropRect);
    bmp.writer('./detect_output/detect_crop.bmp', cropMat);

    // 2. resize
    var resizeMat = imageProcess.resize(cropMat).resize(parseInt(cropMat.width * this.resize_factor), parseInt(cropMat.height * this.resize_factor));
    bmp.writer('./detect_output/detect_resize.bmp', resizeMat);



    // 2.2 erosion
    var erosionMat = imageProcess.erosion(resizeMat).erosion(3);
    bmp.writer('./detect_output/detect_erosion1.bmp', erosionMat);



    var sharpness = imageProcess.sharpness(resizeMat).SMD();
    console.log("sharpness: " + sharpness);

    // 3. blur filter
    var blurMat = imageProcess.filter(erosionMat).blur(7);
    bmp.writer('./detect_output/detect_blur.bmp', blurMat);

    sharpness = imageProcess.sharpness(blurMat).SMD();
    console.log("sharpness: " + sharpness);


    // 4. mean
    var mean = imageProcess.util().mean(blurMat);
    log.text.print('mean: ' + mean + '\n');

    // 4-2 improve contrast
    var contrastMat = imageProcess.contrast(blurMat).improve(mean * 0.8, 1.05);
    bmp.writer('./detect_output/detect_contrast.bmp', contrastMat);

    // 5. binary
    var binaryMat = imageProcess.util().binary(contrastMat, mean * 0.8);
    bmp.writer('./detect_output/detect_binary.bmp', binaryMat);

    // 5.1 erosion
    var erosionMat = imageProcess.erosion(binaryMat).erosion(3);
    bmp.writer('./detect_output/detect_erosion.bmp', erosionMat);


    // 5.2 dilate
    var dilateMat = imageProcess.dilate(erosionMat).dilate(3);
    bmp.writer('./detect_output/detect_dilate.bmp', dilateMat);



    // 6.0 labeling

    // 5.1 labeling
    var labelMat = imageProcess.label(erosionMat).label({ x: binaryMat.width / 2, y: binaryMat.height / 2 });
    bmp.writer('./detect_output/label_mat.bmp', labelMat);

    var invertMat = imageProcess.util().invert(labelMat);
    //log.mat.print(invertMat);
    bmp.writer('./detect_output/invert_mat.bmp', invertMat);



    // 6. find contour
    var points = imageProcess.contour(invertMat).findContour();
    var drawMat = imageProcess.draw(binaryMat).drawPoints(points, 0);
    bmp.writer('./detect_output/detect_contour_points_draw.bmp', drawMat);

    var rectangle = imageProcess.contour(binaryMat).getShape(points);
    // get max rectangle shape
    var drawShapeMat = imageProcess.draw(drawMat).drawRectangleOnMat(drawMat, rectangle, 120);
    bmp.writer('./detect_output/detect_contour_points_draw_rectangle.bmp', drawShapeMat);
    // get avg rectangle shape
    var avgRectangle = imageProcess.contour(binaryMat).getAvgShape(points);
    var drawShapeMat = imageProcess.draw(drawMat).drawRectangleOnMat(drawShapeMat, avgRectangle, 60);
    bmp.writer('./detect_output/detect_contour_points_draw_avg_rectangle.bmp', drawShapeMat);

    // 7. check size validation -> recrop /resize -> convert to bmp base64 string
    //log.mat.print(resizeMat);
};



module.exports = function (mat) {
    var cpDetect = new CPDetect(mat);
    return cpDetect;
};
