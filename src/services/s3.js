var aws = require('aws-sdk');
var fs = require('fs');
var path = require('path');
var s3 = new aws.S3({region: 'us-east-1'});

const uploadToBucket = (bucketName, filePath) => {
    var uploadParams = {Bucket: bucketName, Key: '', Body: ''};
    var file = filePath;
    var fileStream = fs.createReadStream(file);
    fileStream.on('error', function(err) {
        console.log('File Error', err);
    });
    uploadParams.Body = fileStream;
    uploadParams.Key = path.basename(file);
    s3.upload (uploadParams, function (err, data) {
        if (err) {
            console.log("Error", err);
        } if (data) {
            return data.Location;
        }
    });
}

module.exports = {uploadToBucket}