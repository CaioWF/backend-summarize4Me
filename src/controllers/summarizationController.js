const aws = require("aws-sdk");
const multer = require("multer");
const fs = require('fs');
const s3Service = require('../services/s3Service');
const comprehendService = require('../services/comprehendsService');

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
    var pathTranscribedFile = s3Service.uploadFile('summarize4me-files', 'transcribed-files', '/tmp/'+data.jobName+'.txt');
    //Provavelmente vai ter que dar um sleep aqui também pq ta usando o upload
    //TEM QUE VER UM JEITO DELE PEGAR ESSA LANGUAGE CODE
    comprehendService.createJob(data.jobName, pathTranscribedFile, 'pt');
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
