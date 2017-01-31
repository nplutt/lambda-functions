var AWS = require('aws-sdk');
var s3 = new AWS.S3({signatureVersion: 'v4'});
var unzip = require('unzip2');
var util = require('util');
var fs = require('fs');
var async = require('async');

exports.handler = function (event, context) {
    var bucket = event.Records[0].s3.bucket.name;
    var key = event.Records[0].s3.object.key;
    unzipAndUpload(bucket, key);
};

function unzipAndUpload(bucket, key) {
    var params = {
        Key: key,
        Bucket: bucket
    };
    
    async.waterfall([
        function(callback) {
            s3.getObject(params, function(err, data) {
                callback(err, data);
            });
        },
        function(data, callback) {
            fs.writeFile('tmp.zip', data.Body, function(err) {
                callback(err);
            });
        },
        function(callback) {
            fs.mkdir('tmp', function(err) {
                callback(err);
            });
        },
        function(callback) {
            var stream = fs.createReadStream('tmp.zip').pipe(unzip.Extract({ path: 'tmp' }));
            stream.on('finish', function(err) {
                callback(err)
            });
        },
        function(callback) {
            fs.readdir('./tmp/dist/', function(err, files) {
                callback(err, files);
            });
        },
        function(files, callback) {
            async.each(files, function(fileName, callback) {
                var file = fs.createReadStream('./tmp/dist/' + fileName);
                var params = {
                    Bucket: bucket,
                    Key: fileName,
                    Body: file
                };
                s3.putObject(params, function(err, data) {
                    callback(err);
                });
            }, function(err) {
                callback(err);
            });
        }
    ]);
}