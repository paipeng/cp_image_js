
const imageprocess = require('../lib/imageprocess/cp_imageprocess')

test('string with a addition of two number', () => {
    expect(imageprocess.convexHull().add(1, 2)).toBe(3);
});