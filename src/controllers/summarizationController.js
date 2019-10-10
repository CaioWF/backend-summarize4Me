const aws = require("aws-sdk");
const multer = require("multer");
const fs = require('fs');
const s3Service = require('../services/s3Service');
const comprehendService = require('../services/comprehendsService');
const saveFileLocally = require('../utils/saveFileLocally');

const initSummarization = (summary, file) => {
  try {
    let fileName = newSummary.id + '-' + newSummary.title;
    const s3FilePath = uploadToBucket(fileName, file);
    await sleep(20000);
    transcribeService.createJob(fileName, 'pt-BR', s3FilePath, callbackTranscribe);
    let transcribedFileText = getTranscriptionJobOutput(fileName);
    let pathTranscribedFile = saveTranscription(jobName, transcribedFileText);
    await sleep(20000);
    comprehendService.createJob(fileName, pathTranscribedFile, 'pt');
  } catch (err) {
    console.log(err)
  }
};

const saveTranscription = (jobName, transcribedFileText) => {
  fs.writeFile("/tmp/"+jobName+".txt", JSON.stringify(transcribedFileText), (err) => {
    if (err) {
      console.error(err);
    }
  });
  return s3Service.uploadFile('summarize4me-files', 'transcribed-files', '/tmp/'+data.jobName+'.txt');
}

const getTranscriptionJobOutput = (fileName) => {
  let loop = true;
  while(loop){
    await sleep(20000);
    let job = transcribeService.getTranscriptionJob(fileName, (err, data) => {
      let status = data.TranscriptionJobStatus;
      if( status === 'COMPLETED') {
        loop = false;
        return data.Transcript.TranscriptFileUri;
      } else if (status === 'FAILED') {
            loop = false;
            throw err;
          }
    });
  }
}

const sleep = (ms) => {
  return new Promise(resolve => {
      setTimeout(resolve, ms);
  });
};

const uploadToBucket = (fileName, file) => {
  let filePath = saveFileLocally.saveFileLocally(file, fileName);
  return await s3Service.uploadFile(process.env.AUDIO_BUCKET, 'audios', filePath);
}

const callbackTranscribe = (err, data) => {
  if (err) console.log(err, err.stack);
  else {
    console.log("Success", data);
  }
};

const callbackComprehend = (err, data) => {
  if (err) console.log(err, err.stack);
  else {
    console.log("Success", data);
    return data;
  }
};

module.exports = { initSummarization };
