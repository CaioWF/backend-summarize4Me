const aws = require("aws-sdk");

var comprehend = new AWS.Comprehend();

const createJob = (jobName, uriOrigin, languageCode) => {
    var params = {
        DataAccessRoleArn: 'STRINGVALUE', /* required */
        InputDataConfig: { /* required */
          S3Uri: uriOrigin, /* required */
          InputFormat: 'ONE_DOC_PER_FILE'
        },
        LanguageCode: languageCode, /* required */
        OutputDataConfig: { /* required */
          S3Uri: 'summarize4Me/comprehend-files', /* required */
        },
        JobName: jobName,
        VpcConfig: {
          SecurityGroupIds: [ // required
            'STRING_VALUE',
          ],
          Subnets: [ // required
            'STRING_VALUE',
          ]
        }
      };

      comprehend.startKeyPhrasesDetectionJob(params, function(err, data) {
        if (err) console.log(err, err.stack);
        else {
            console.log(data);
            return data;
        }
      });
};

module.exports = {
    createJob
}
