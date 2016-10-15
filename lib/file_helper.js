
var fs = require('fs');


var fileHelper = module.exports = exports;

fileHelper.readTsFiles = function(dir, callback) {
        fs.readdir(dir, function(err, files) {
            if (err) {
                console.error('read dir failed : ', err);
                callback(err);
            }
            callback(null, files.filter(function(file) {
                return file.endsWith(".ts");
            }));
        });
};
