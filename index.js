var writer = require('m3u').httpLiveStreamingWriter();

var fileHelper = require('./lib/file_helper');
var ffprobeHelper = require('./lib/ffprobe_helper');


function writeHeader() {
    writer.version(3);
	writer.targetDuration(10);
    writer.mediaSequence(0);
    writer.playlistType('VOD');
}

function writerTS(file, duration) {
    writer.file(file, duration, "");
}

function writeEnd() {
    writer.endlist();
}


function main(dir) {
    writeHeader();
    fileHelper.readTsFiles(dir, function(err, files) {
        for (let index =  0; index < files.length; index++) {
            let file = files[index];
            ffprobeHelper.exec(dir + '/' + file, 
                function(err, data) {
                    writerTS(file, data);
                    if (index === files.length - 1) {
                         writeEnd();
                         console.log(writer.toString());
                    }
                }); 
        }
    });
}

main(process.argv[2]);