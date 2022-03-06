
var log = require("../log/cp_log");
var bmp = require("../bmp/cp_bmp");
var imageProcess = require("../imageprocess/cp_imageprocess");
const { crop } = require("../imageprocess/cp_imageprocess");

function CPDetect(mat) {
    this.mat = mat;

    // 0 
    // conver to gray

    this.grayMat = imageProcess.util().gray(this.mat);
    bmp.writer('./detect_output/detect_gray.bmp', this.grayMat);


    this.crop_factor = 0.8;
    this.resize_factor = 0.4;
    this.detectResult = {
        major_version: 1,
        minor_version: 0,
        revision_number: 0,
        detected_color_channel: 0,
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 0
    };
    this.detect_state = 0;
}

CPDetect.prototype.getCropRect = function (crop_factor) {
    return {
        x: parseInt(this.mat.width * ((1 - crop_factor) / 2)),
        y: parseInt(this.mat.height * ((1 - crop_factor) / 2)),
        width: parseInt(this.mat.width * crop_factor),
        height: parseInt(this.mat.height * crop_factor)
    };
}


CPDetect.prototype.getPostCropRect = function () {

    return {
        x: parseInt(this.mat.width * ((1 - crop_factor) / 2)),
        y: parseInt(this.mat.height * ((1 - crop_factor) / 2)),
        width: parseInt(this.mat.width * crop_factor),
        height: parseInt(this.mat.height * crop_factor)
    };
}



CPDetect.prototype.checkDetectState = function () {

};

CPDetect.prototype.postProcess = function (detectedRect) {
    console.log('postProcess: ', detectedRect);
    var cropWidth = parseInt(640 * (detectedRect.right - detectedRect.left) / 432);
    var cropHeight = cropWidth;

    var cropX = parseInt((detectedRect.left - (cropWidth - (detectedRect.right - detectedRect.left)) / 2));
    var cropY = parseInt((detectedRect.top - (cropHeight - (detectedRect.bottom - detectedRect.top)) / 2));


    console.log(cropX + '-' + cropY + '  //  ' + cropWidth + '-' + cropHeight);
    // resize
    cropX = parseInt(cropX / this.resize_factor);
    cropY = parseInt(cropY / this.resize_factor);
    cropWidth = parseInt(cropWidth / this.resize_factor);
    cropHeight = parseInt(cropHeight / this.resize_factor);

    // crop_factor
    cropX += parseInt(this.mat.width * (1 - this.crop_factor) / 2);
    cropY += parseInt(this.mat.height * (1 - this.crop_factor) / 2);

    var cropRect = {
        x: cropX,
        y: cropY,
        width: cropWidth,
        height: cropHeight
    }
    // crop with border
    console.log('resize factor', cropRect);
    var cropMat = imageProcess.crop(this.grayMat).cropRect(cropRect);
    bmp.writer('./detect_output/detect_post_crop.bmp', cropMat);


    var resizeCropMat = imageProcess.resize(cropMat).resize(this.detectParam.resize_width, this.detectParam.resize_height);


    return resizeCropMat;
};


CPDetect.prototype.detect = function (detectParam) {
    this.detectParam = detectParam;
    console.log('detect: ', detectParam);
    console.log('mat size: ' + this.mat.width + '-' + this.mat.height);




    // 1. crop
    var cropRect = this.getCropRect(detectParam.crop_factor);
    console.log(cropRect);
    var cropMat = imageProcess.crop(this.grayMat).cropRect(cropRect);
    bmp.writer('./detect_output/1_detect_crop.bmp', cropMat);

    // 2. resize
    var resizeMat = imageProcess.resize(cropMat).resize(parseInt(cropMat.width * this.resize_factor), parseInt(cropMat.height * this.resize_factor));
    bmp.writer('./detect_output/2_0_detect_resize.bmp', resizeMat);

    // 2.1 contrast
    var contrastMat = imageProcess.contrast(resizeMat).improve2(1.2, -50);
    bmp.writer('./detect_output/2_1_detect_contrast_1.bmp', contrastMat);


    // 2.2 erosion
    var erosionMat = imageProcess.erosion(contrastMat).erosion(3);
    bmp.writer('./detect_output/2_2_detect_erosion1.bmp', erosionMat);

    var sharpness = imageProcess.sharpness(resizeMat).SMD();
    console.log("sharpness: " + sharpness);

    // 3. blur filter
    var blurMat = imageProcess.filter(erosionMat).blur(7);
    bmp.writer('./detect_output/3_detect_blur.bmp', blurMat);

    sharpness = imageProcess.sharpness(blurMat).SMD();
    console.log("sharpness: " + sharpness);

    // 4. mean
    var mean = imageProcess.util().mean(blurMat);
    log.text.print('mean: ' + mean + '\n');

    // 4-2 improve contrast
    contrastMat = imageProcess.contrast(blurMat).improve(mean * 0.8, 1.05);
    bmp.writer('./detect_output/4_2_detect_contrast.bmp', contrastMat);

    // 5. binary
    var binaryMat = imageProcess.util().binary(contrastMat, mean * 0.8);
    bmp.writer('./detect_output/5_detect_binary.bmp', binaryMat);

    // 5.1 erosion
    var erosionMat = imageProcess.erosion(binaryMat).erosion(3);
    bmp.writer('./detect_output/5_1_detect_erosion.bmp', erosionMat);

    // 5.2 dilate
    //var dilateMat = imageProcess.dilate(erosionMat).dilate(3);
    //bmp.writer('./detect_output/detect_dilate.bmp', dilateMat);

    // 5.3 labeling
    var labelMat = imageProcess.label(erosionMat).label({ x: binaryMat.width / 2, y: binaryMat.height / 2 });
    bmp.writer('./detect_output/5_2_detect_label.bmp', labelMat);

    var invertMat = imageProcess.util().invert(labelMat);
    //log.mat.print(invertMat);
    bmp.writer('./detect_output/5_3_detect_invert.bmp', invertMat);

    // 6. find contour
    var points = imageProcess.contour(invertMat).findContour();
    var drawMat = imageProcess.draw(binaryMat).drawPoints(points, 0);
    bmp.writer('./detect_output/6_1_detect_contour_points_draw.bmp', drawMat);

    var rectangle = imageProcess.contour(binaryMat).getShape(points);
    // get max rectangle shape
    var drawShapeMat = imageProcess.draw(drawMat).drawRectangleOnMat(drawMat, rectangle, 120);
    bmp.writer('./detect_output/6_2_detect_contour_points_draw_rectangle.bmp', drawShapeMat);
    // get avg rectangle shape
    var avgRectangle = imageProcess.contour(binaryMat).getAvgShape(points);
    var drawShapeMat = imageProcess.draw(drawMat).drawRectangleOnMat(drawShapeMat, avgRectangle, 60);
    bmp.writer('./detect_output/6_3_detect_contour_points_draw_avg_rectangle.bmp', drawShapeMat);

    avgRectangle = rectangle;
    this.detectResult.x1 = parseInt(avgRectangle.left / this.resize_factor);
    this.detectResult.y1 = parseInt(avgRectangle.top / this.resize_factor);
    this.detectResult.x2 = parseInt(avgRectangle.right / this.resize_factor);
    this.detectResult.y2 = parseInt(avgRectangle.bottom / this.resize_factor);


    var detectedMat = this.postProcess(avgRectangle);
    bmp.writer('./detect_output/7_detected_mat.bmp', detectedMat);

    // 7. check size validation -> recrop /resize -> convert to bmp base64 string
    if ((this.detectResult.x2 - this.detectResult.x1) < 240) {
        // too small
        this.detect_state = 5;
    } else {

        // check sharpness
        var c_width = parseInt(432 * 0.9);
        var c_height = parseInt(360 * 0.9);

        cropRect = {
            top: parseInt((detectedMat.height - c_height) / 2),
            left: parseInt((detectedMat.width - c_width) / 2),
            right: parseInt((detectedMat.width - c_width) / 2) + c_width,
            bottom: parseInt((detectedMat.height - c_height) / 2) + c_height
        }
        this.detectResult.sharpness = imageProcess.sharpness(detectedMat).sharpness(cropRect);
        var cropMat = imageProcess.crop(detectedMat).cropRect({
            x: cropRect.left,
            y: cropRect.top,
            width: cropRect.right - cropRect.left,
            height: cropRect.bottom - cropRect.top
        });
        bmp.writer('./detect_output/7_1_detected_mat_crop.bmp', cropMat);
        console.log("sharpness: " + this.detectResult.sharpness);

        if (this.detectResult.sharpness < this.detectParam.min_sharpness) {
            this.detect_state = 7;
        } else {
            this.detect_state = 9;
        }
        //log.mat.print(resizeMat);
    }



    return {
        detect_state: this.detect_state,
        detectedMat: detectedMat,
        detectResult: this.detectResult
    };
};



module.exports = function (mat) {
    var cpDetect = new CPDetect(mat);
    return cpDetect;
};
