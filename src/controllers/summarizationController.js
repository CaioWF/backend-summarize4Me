const aws = require("aws-sdk");
const multer = require("multer");
const fs = require('fs');
const s3Service = require('../services/s3Service');
const comprehendService = require('../services/comprehendsService');

const initSummarization = (summary, file) => {
  try {
    let fileName = newSummary.id + '-' + newSummary.title;
    const s3FilePath = uploadToBucket(fileName, file);
    await sleep(20000);
    transcribeService.createJob(fileName, 'pt-BR', s3FilePath, callbackTranscribe);
  } catch (err) {
    console.log(err)
  }
};

const uploadToBucket = (fileName, file) => {
  let filePath = saveFileLocally.saveFileLocally(file, fileName);
  return await s3Service.uploadFile(process.env.AUDIO_BUCKET, 'audios', filePath);
}

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

module.exports = { initSummarization };
