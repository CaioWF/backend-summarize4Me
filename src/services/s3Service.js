var aws = require('aws-sdk');
var fs = require('fs');
var path = require('path');
var s3 = new aws.S3({ region: 'us-east-2' });

const uploadFile = (bucketName, key, filePath) => {
    let fileStream = fs.createReadStream(filePath);

    let params = { Bucket: bucketName, Key: key, Body: fileStream };

    s3.upload(params, (err, data) => {
        if (err)
            console.log(err);
    });

    return 's3://' + bucketName + '/' + key;
}

const downloadFile = (bucketName, key, filePath) => {
    const params = { Bucket: bucketName, Key: key };

    s3.getObject(params, (err, data) => {
        if (err)
            throw err;

        fs.writeFileSync(filePath, data.Body.toString());
    });
};

module.exports = { uploadFile, downloadFile }