const aws = require("aws-sdk");
const multer = require("multer");
var fs = require('fs');
var s3 = require('../services/s3Service');

const summarizationProccess = (summary, uri) => {
  try {
    transcribe.createJob(summary.id, summary.title, summary.languageCode, uri, callbackTranscribe);
    
  } catch (err) {}
};

const callbackTranscribe = (err, data) => {
  if (err) console.log(err, err.stack);
  else {
    fs.writeFile("/tmp/"+data.jobName+".txt", JSON.stringify(data.results.transcripts[0].transcript), (err) => {
      if (err) {
          console.error(err);
      }
    });
    var pathTranscribedFile = s3.uploadToBucket('summarize4me-files/transcribed-files', '/tmp/'+data.jobName+'.txt');
    //TEM QUE VER UM JEITO DELE PEGAR ESSA LANGUAGE CODE
    comprehend.createJob(data.jobName, pathTranscribedFile, 'pt');
    console.log("Success", data);
    return data;
  }
};

const callbackComprehend = (err, data) => {
  if (err) console.log(err, err.stack);
  else {
    console.log("Success", data);
    return data;
  }
};

module.exports = { summarizationProccess };
