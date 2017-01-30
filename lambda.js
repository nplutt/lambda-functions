var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var unzip = require('unzip');
var stm = require('stream');
var util = require('util');
var fs = require('fs');

exports.handler = function (event, context) {
    var bucket = event.Records[0].s3.bucket.name;
    var key = event.Records[0].s3.object.key;
    console.log('Bucket: ' + bucket + ' Key: ' + key);
    console.log('Retriving file');
    var params = {
        Bucket: bucket,
        Key: key
    };
    s3.getObject(params, function(err, data) {
        if (err) {
            console.log(err, err.stack);
        }
        else {
            console.log('Retrieved zip file ' + key);
            var file = fs.createWriteStream('tmp.zip');
            console.log(data.Body)
            // data.Body.createReadStream().pipe(file);
            // fs.createReadStream('./' + file)
            //     .pipe(unzip.Parse())
            //     .on('entry', function(entry) {
            //         var fileName = entry.path;
            //         entry.pipe(fs.createWriteStream('./'))
            //     });
            // fs.readdir(testFolder, function(err, files) {
            //     files.forEach( function (f) {
            //         console.log(file);
            //     });
            // });
            // context.done(null, '');
        }
    });
};