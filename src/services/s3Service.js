var aws = require('aws-sdk');
var fs = require('fs');
var path = require('path');
var s3 = new aws.S3({ region: 'us-east-2' });

const uploadFile = async (bucketName, folderName, filePath) => {
    let s3FileLocation = bucketName + '/' + folderName;
    let s3FileName = path.basename(filePath);
    let fileStream = fs.createReadStream(filePath);

    let params = { Bucket: s3FileLocation, Key: s3FileName, Body: fileStream };

    await s3.upload(params, (err, data) => {
        if (err)
            console.log(err);
    });

    return 's3://' + s3FileLocation + '/' + s3FileName;
}

module.exports = { uploadFile }