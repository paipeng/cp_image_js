
if ((typeof wx) == 'undefined') {
    var fs = require("fs");
}

function BmpWriter(imageFile, mat) {
    this.mat = mat;
    this.setHeader();
    this.writeToFile(imageFile, this.generateData());
}


BmpWriter.prototype.setHeader = function () {
    // console.log('setHeader');
    this.extraBytes = this.mat.width % 4;
    // 
    // row_size = 4 * ((mat -> width * bitsPerPixel + 31) / 32);
    this.rowSize = 4 * parseInt(((this.mat.width * 8 + 31) / 32));
    // console.log(this.rowSize);
    this.rgbSize = this.mat.height * this.rowSize;//(this.mat.width + this.extraBytes);
    this.headerInfoSize = 40;

    this.flag = "BM";
    this.reserved = 0;

    if (this.mat.channel == 1) {
        this.planes = 1;
        this.bitPP = 8;
        this.colors = 256;
    } else if (this.mat.channel == 3) {
        this.planes = 3;
        this.bitPP = 24;
        this.colors = 0;
    }

    this.compress = 0;
    this.hr = 600 * 10000 / 254;
    this.vr = 600 * 10000 / 254;

    this.importantColors = 0;

    this.offset = 54 + this.colors * 4;
    this.fileSize = this.rgbSize + this.offset;
    // console.log(this.fileSize);
}


BmpWriter.prototype.writeToFile = function (imageFile, data) {
    fs.writeFileSync(imageFile, data);
}

BmpWriter.prototype.generateData = function () {
    // console.log('generateData');
    var tempBuffer = Buffer.alloc(this.fileSize);
    this.pos = 0;
    tempBuffer.write(this.flag, this.pos, 2); this.pos += 2;
    tempBuffer.writeUInt32LE(this.fileSize, this.pos); this.pos += 4;
    tempBuffer.writeUInt32LE(this.reserved, this.pos); this.pos += 4;
    tempBuffer.writeUInt32LE(this.offset, this.pos); this.pos += 4;

    tempBuffer.writeUInt32LE(this.headerInfoSize, this.pos); this.pos += 4;
    tempBuffer.writeUInt32LE(this.mat.width, this.pos); this.pos += 4;
    tempBuffer.writeInt32LE(this.mat.height, this.pos); this.pos += 4;
    tempBuffer.writeUInt16LE(this.planes, this.pos); this.pos += 2;


    tempBuffer.writeUInt16LE(this.bitPP, this.pos); this.pos += 2;
    tempBuffer.writeUInt32LE(this.compress, this.pos); this.pos += 4;


    tempBuffer.writeUInt32LE(this.rgbSize, this.pos); this.pos += 4;
    tempBuffer.writeUInt32LE(this.hr, this.pos); this.pos += 4;
    tempBuffer.writeUInt32LE(this.vr, this.pos); this.pos += 4;
    tempBuffer.writeUInt32LE(this.colors, this.pos); this.pos += 4;
    tempBuffer.writeUInt32LE(this.importantColors, this.pos); this.pos += 4;

    if (this.colors > 0) {
        // write color table!
        for (var i = 0; i < 256; i++) {
            for (var j = 0; j < 4; j++) {
                tempBuffer.writeUInt8((i * (j != 3)), this.pos++);
            }
        }
    }
    var i = 0;

    var remainder = this.rowSize - this.mat.width * this.mat.channel;
    for (var y = 0; y < this.mat.height; y++) {
        var p = 0;
        for (var x = 0; x < this.mat.width * this.mat.channel; x++) {
            p = this.pos + y * this.rowSize + x;
            //i++;//a
            tempBuffer[p] = this.mat.data[(this.mat.height - y - 1) * this.mat.width * this.mat.channel + x];//this.mat.data[i++];
        }
        for (var j = 0; j < remainder; j++) {
            //tempBuffer[p++] = 0;
        }
    }

    return tempBuffer;
};


module.exports = function (imagFile, mat) {
    var writer = new BmpWriter(imagFile, mat);
    return writer;
};
