var cp_image = require("../index");


beforeEach(() => {
});

afterEach(() => {

});



test('write gray-mat to bmp ', () => {
    var mat = cp_image.matUtil.createMat(23, 21, 1);

    mat.data[42] = 0;
    cp_image.matUtil.writeBmpMat('./output/mat_gray.bmp', mat);
});



test('write color-mat to bmp ', () => {
    var mat = cp_image.matUtil.createMat(22, 20, 3);


    mat.data[42] = 0;
    mat.data[43] = 0;
    //mat.data[44] = 0;
    cp_image.matUtil.writeBmpMat('./output/mat_color.bmp', mat);
});




