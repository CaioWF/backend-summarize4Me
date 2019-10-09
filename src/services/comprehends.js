const aws = require("aws-sdk");

var comprehend = new AWS.Comprehend();

const criarJob = options => {
    var params = {
        DataAccessRoleArn, /* required */
        InputDataConfig: { /* required */
          S3Uri, /* required */
          InputFormat
        },
        LanguageCode, /* required */
        OutputDataConfig: { /* required */
          S3Uri: 'comprehendsteste', /* required */
        },
        JobName,
        /*VpcConfig: {
          SecurityGroupIds: [ // required
            'STRING_VALUE',
          ],
          Subnets: [ // required
            'STRING_VALUE',
          ]
        }*/
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
    criarJob
}
