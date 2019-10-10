const aws = require("aws-sdk");

const dotenv = require('dotenv');
dotenv.config()

const transcribeService = new aws.TranscribeService({ region: 'us-east-2' });

const createJob = (jobName, languageCode, mediaFileUri, callbackFunction) => {
  var params = {
    TranscriptionJobName: jobName,
    LanguageCode: languageCode,
    Media: {
      MediaFileUri: mediaFileUri
    },
    OutputBucketName: process.env.TRANSCRIBE_BUCKET
  };

  transcribeService.startTranscriptionJob(params, callbackFunction);
};

module.exports = { createJob };
