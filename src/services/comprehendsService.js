const aws = require("aws-sdk");

const dotenv = require('dotenv');
dotenv.config()

const comprehendService = new AWS.Comprehend();

const createKeyPhrasesDetectionJob = (jobName, s3Uri, languageCode, callbackFunction) => {
  let params = {
    JobName: jobName,
    DataAccessRoleArn: 'STRINGVALUE',
    InputDataConfig: {
      S3Uri: s3Uri,
      InputFormat: 'ONE_DOC_PER_FILE'
    },
    LanguageCode: languageCode,
    OutputDataConfig: {
      S3Uri: process.env.COMPREHEND_BUCKET
    },
    // VpcConfig: {
    //   SecurityGroupIds: [ // required
    //     'STRING_VALUE',
    //   ],
    //   Subnets: [ // required
    //     'STRING_VALUE',
    //   ]
    // }
  };

  comprehendService.startKeyPhrasesDetectionJob(params, callbackFunction);
};

module.exports = { createKeyPhrasesDetectionJob }
