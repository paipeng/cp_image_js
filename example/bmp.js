var cp_image = require("../index");

var mat = cp_image.matUtil.createMat(20, 20, 3);
cp_image.matUtil.writeBmpMat('./output/mat_color.bmp', mat);