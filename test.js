var unzip = require('unzip2');
var util = require('util');
var fs = require('fs');
var async = require('async');
var walk = require('walk');
var path = require('path');


unzipAndUpload();

function unzipAndUpload() {
    var filePath = '/tmp/temp.zip';
    var folderPath = '/tmp/temp';

    async.waterfall([
        // function(data, callback) {
        //     fs.writeFile(filePath, data.Body, function(err) {
        //         callback(err);
        //     });
        // },
        // function(callback) {
        //     fs.mkdir(folderPath, function(err) {
        //         callback(err);
        //     });
        // },
        // function(callback) {
        //     var stream = fs.createReadStream(filePath).pipe(unzip.Extract({ path: folderPath }));
        //     stream.on('finish', function(err) {
        //         callback(err);
        //     });
        // },
        function(callback) {
            var walker = walk.walk('./muck');
            var files = [];
            walker.on('file', function(root, fileStats, next) {
                var filePath = root + fileStats.name;
                var file = {
                    'name': fileStats.name,
                    'path': filePath
                };
                files.push(file);

                next();
            });
            walker.on('errors', function(root, fileStats, next) {
                next();
            });
            walker.on('end', function(root, fileStats, next) {
                callback(null, files);
            });
        }
        function(files, callback) {
            async.each(files, function(file, callback) {
                var fileData = fs.createReadStream('/tmp/temp/dist/' + fileName);
                console.log(fileData);
                var params = {
                    Bucket: process.env.WEB_BUCKET,
                    Key: fileName,
                    Body: fileData
                };
                s3.putObject(params, function(err, data) {
                    callback(err);
                });
            }, function(err) {
                callback(err);
            });
        }
    ], function(err) {
        // context.done(null, '');
    });
}