const aws = require("aws-sdk");
const comprehend = require("./comprehendsService");

var transcribeservice = new aws.TranscribeService();

const createJob = (id, name, languageCode, uriOrigin, callback) => {
  
  
  var params = {
    LanguageCode: languageCode,
    Media: {
      MediaFileUri: uriOrigin
    },
    TranscriptionJobName: id + "-" + name,
    OutputBucketName: "summarize4me-files/transcribed-files/"
    /*MediaFormat: mp3 | mp4 | wav | flac,
  MediaSampleRateHertz: 'NUMBER_VALUE',
  OutputEncryptionKMSKeyId: 'STRING_VALUE',
  Settings: {
    ChannelIdentification: true || false,
    MaxSpeakerLabels: 'NUMBER_VALUE',
    ShowSpeakerLabels: true || false,
    VocabularyName: 'STRING_VALUE'
  }*/
  };

  transcribeservice.startTranscriptionJob(params, callback);
  
};

module.exports = {
  createJob
};
