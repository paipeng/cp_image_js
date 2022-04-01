var cp_image = require("../index");

var mat = cp_image.matUtil.createMat(20, 20, 3);


mat.data[42] = 0;
mat.data[43] = 0;
mat.data[44] = 0;
cp_image.matUtil.writeBmpMat('./output/mat_color.bmp', mat);