
var cp_image = require("../index");

test('string with a addition of two number', () => {
    expect(cp_image.imageprocess.convexHull().add(1, 2)).toBe(3);
});