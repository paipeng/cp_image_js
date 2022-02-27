var log = require('npmlog')


//var logMat = require("./cp_log_mat");

//process.stdin.resume();
//process.stdin.setEncoding('utf8');

function CpLogMat() {
    this.a = 1;
}

CpLogMat.prototype.print = function (mat) {
    //log.info('fyi', 'I have a kitty cat: %j', mat.data.length)
    for (var i = 0; i < mat.height; i++) {
        for (var j = 0; j < mat.width; j++) {
            process.stdout.write(mat.data[i * mat.width + j] + " ");
            //process.stderr.write("hello: ");
        }
        process.stderr.write("\n")
    }
};


function CpLogArray() {

}

CpLogArray.prototype.print = function (data, width, height) {
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            process.stdout.write(data[i * width + j] + " ");
            //process.stderr.write("hello: ");
        }
        process.stderr.write("\n")
    }
}



function CpLogText() {

}

CpLogText.prototype.print = function (data) {
    process.stdout.write(data);
}


module.exports = {
    mat: new CpLogMat(),
    array: new CpLogArray(),
    text: new CpLogText()
};