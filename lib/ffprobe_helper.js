
var child_process = require('child_process');
var exec = child_process.execSync;
var ffprobeHelper = module.exports = exports;

ffprobeHelper.exec = function(file, callback) {
    console.log(file);
    let cmd = ' ffprobe -print_format json -show_format -show_streams -i ' + file;
    var data = exec(cmd);
    let jsonData = JSON.parse(data);
    callback(null, jsonData.format.duration + ", startTime:" + jsonData.format.start_time);
}
