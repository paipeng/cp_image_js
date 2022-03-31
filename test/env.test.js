
test('env test', () => {
    console.log(typeof WechatMiniprogram);
    if ((typeof WechatMiniprogram) != "undefined") {
        console.log('undefined');
    } else {
        console.log('defined');
    }
    expect((typeof WechatMiniprogram)).toBe("undefined");
});



