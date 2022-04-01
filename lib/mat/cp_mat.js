class CPMat {
    constructor(width = 0, height = 0, channel = 0) {
        this.width = width;
        this.height = height;
        this.channel = channel;
        this.data = new Uint8Array(width * height * channel).fill(255);
    }
};

module.exports = CPMat;