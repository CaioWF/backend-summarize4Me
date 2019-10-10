const fs = require('fs');
const s3Service = require('../services/s3Service');
const transcribeService = require('../services/transcribeService');
const comprehendService = require('../services/comprehendService');
const saveFileLocally = require('../utils/saveFileLocally');

const initSummarization = async (summary, file) => {
  try {
    let key = summary.id + '-' + summary.title;

    let remoteAudioFilePath = uploadAudioFileToS3(file, key);

    transcribeService.createJob(key, 'pt-BR', remoteAudioFilePath, (err, data) => {
      if (err)
        throw err;
    });

    onTranscribeJobFinish(key, success => {
      if (success) {
        // Download transcript from s3
      }
    });

    let localTranscriptionFile = extractTranscriptionFromTranscriptionFile('./uploads/transcriptions/' + key + '.json');
    let remoteTranscriptionFile = s3Service.uploadFile(process.env.TRANSCRIPT_BUCKET + '/transcript', key, localTranscriptionFile);

    comprehendService.createKeyPhrasesDetectionJob(key, remoteTranscriptionFile, 'pt', (err, data) => {
      if (err)
        throw err;
    });

    onComprehendJobFinish(key, success => {
      if (success) {
        // Download comprehend from s3
      }
    });

  } catch (err) {
    throw err;
  }
};

const uploadAudioFileToS3 = (file, key) => {
  let localFilePath = saveFileLocally.saveFileLocallyFromRequest(file, key);

  return s3Service.uploadFile(process.env.AUDIO_BUCKET + '/audios', key, localFilePath);
}

const onTranscribeJobFinish = async (jobName, callbackFunction) => {
  let inProgress = true;

  while (inProgress) {
    await sleep(20000);

    transcribeService.getJob(jobName, (err, data) => {
      if (err) {
        throw err;
      } else {
        let status = data.TranscriptionJob.TranscriptionJobStatus;

        if (status === 'COMPLETED') {
          inProgress = false;
          callbackFunction(true);
        } else if (status === 'FAILED') {
          inProgress = false;
          callbackFunction(false);
        }
      }
    });
  }
}

const extractTranscriptionFromTranscriptionFile = (filePath) => {
  // Not implemented
}

const onComprehendJobFinish = async (jobName, callbackFunction) => {
  // Not implemented
}

const sleep = (ms) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

module.exports = { initSummarization };
