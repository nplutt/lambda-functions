var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var unzip = require('unzip');
var stm = require('stream');
var util = require('util');
var fs = require('fs');
var async = require('async');

getObject();

function getObject() {
    console.log('Hello world!');
    var bucket = 'nickplutt';
    var key = 'ui-build-AngularPipe/MyAppBuild/muck.zip';

    var params = {
        Key: key,
        Bucket: bucket
    };


    async.waterfall([
        function(callback) {
            s3.getObject(params, function(err, data) {
                callback(err, data)
            });
        },
        function(data, callback) {
            fs.writeFile('tmp.zip', data.Body, function(err) {
                callback(err)
            })
        }
    ]);
    // s3.getObject(params, function(err, data) {
    //     if (err) {
    //         console.log(err)
    //     }
    //     else {
    //         console.log('Retrieved the file!');
    //         console.log(data.Body);
    //
    //         // var file = fs.createWriteStream('tmp.zip');
    //         fs.writeFile('tmp.zip', data.Body, function (err) {
    //             if (err) throw err;
    //             console.log('It saved!');
    //
    //
    //
    //
    //         });
    //     }
    // });
}