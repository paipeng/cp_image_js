// var log = require('npmlog')
//var logMat = require("./cp_log_mat");
//process.stdin.resume();
//process.stdin.setEncoding('utf8');
var CPPoint = require('../mat/cp_point');
var CPLine = require('../mat/cp_line');
class CPLog {
    constructor() {

    }

    printMat(mat) {
        //log.info('fyi', 'I have a kitty cat: %j', mat.data.length)
        for (var i = 0; i < mat.height; i++) {
            for (var j = 0; j < mat.width; j++) {
                process.stdout.write(mat.data[i * mat.width + j] + " ");
                //process.stderr.write("hello: ");
            }
            process.stderr.write("\n")
        }
    }

    print(data, width, height) {
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                process.stdout.write(data[i * width + j] + " ");
                //process.stderr.write("hello: ");
            }
            process.stderr.write("\n")
        }
    }

    /**
     * 
     * @param {CPPoint} point 
     */
    printPoint(point) {
        console.log('point: ', point);
    }

    /**
     * 
     * @param {CPLine} line 
     */
    printLine(line) {
        console.log('line: ', line.start, line.end);
    }
};

function CpLogText() {

}

CpLogText.prototype.print = function (data) {
    process.stdout.write(data);
}

function CpLogTime() {
    this.logTimes = [];
}

CpLogTime.prototype.startTime = function (text) {
    var ppp = null;
    if ((typeof wx) == 'undefined') {
        //console.time(text);
        ppp = Date;

    } else {
        ppp = wx.getPerformance();
    }
    var index = this.logTimes.findIndex(x => x.name == text);

    if (index === -1) {
        this.logTimes.push({ name: text, time: ppp.now() });
    } else {
        this.logTimes[index].time = ppp.now();
    }
    //console.error(text + ' (start)');
}

CpLogTime.prototype.endTime = function (text) {
    var ppp = null;
    if ((typeof wx) == 'undefined') {
        //console.timeEnd(text);
        ppp = Date;

    } else {
        ppp = wx.getPerformance();

    }
    var index = this.logTimes.findIndex(x => x.name == text);
    if (index !== -1) {
        console.info(text + ' (runtime): ' + (ppp.now() - this.logTimes[index].time) + 'ms');
        this.logTimes.pop(this.logTimes[index]);
    }
}



module.exports = {
    log: new CPLog(),
    text: new CpLogText(),
    time: new CpLogTime()
};