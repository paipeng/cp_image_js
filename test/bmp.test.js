var cp_image = require("../index");


beforeEach(() => {
});

afterEach(() => {

});



test('write gray-mat to bmp ', () => {
    var mat = cp_image.matUtil.createMat(20, 20, 1);
    cp_image.matUtil.writeBmpMat('./output/mat_gray.bmp', mat);
});



test('write color-mat to bmp ', () => {
    var mat = cp_image.matUtil.createMat(20, 20, 3);
    cp_image.matUtil.writeBmpMat('./output/mat_color.bmp', mat);
});




