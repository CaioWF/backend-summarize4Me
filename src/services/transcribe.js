const aws = require("aws-sdk");

var transcribeservice = new aws.TranscribeService();

const criarJob = options => {
  var params = {
    LanguageCode,
    Media: {
      MediaFileUri: options.uri
    },
    TranscriptionJobName,
    MediaFormat,
    OutputBucketName: "transcricoesteste"
  };

  transcribeservice.startTranscriptionJob(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else {
        console.log("Success", data);
        return data;
    };
  });
};

module.exports = {
    criarJob
}
