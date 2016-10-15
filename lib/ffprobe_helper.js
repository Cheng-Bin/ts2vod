
var child_process = require('child_process');
var exec = child_process.exec;
var asyncblock = require('asyncblock');
var ffprobeHelper = module.exports = exports;

ffprobeHelper.exec = function(file, callback) {
    let cmd = ' ffprobe -print_format json -show_format -show_streams -i ' + file;

    asyncblock(function(flow) {
        exec(cmd, flow.add())
        var data = flow.wait();
        let jsonData = JSON.parse(data);
        callback(null, jsonData.format.duration);
    });
}
