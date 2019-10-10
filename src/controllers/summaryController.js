const dotenv = require('dotenv');
dotenv.config();
const summarizationController = require('../controllers/summarizationController');


const Summary = require('../models/Summary');

const s3Service = require('../services/s3Service');
const transcribeService = require('../services/transcribeService');

const saveFileLocally = require('../utils/saveFileLocally');

const create = async (req, res) => {
    try {
        const newSummary = await Summary.create(req.body);

        summarizationController.initSummarization(newSummary, req.files.file);

        return res.status(201).send({ newSummary });
    } catch (err) {
        return res.status(400).send({ error: 'Error creating new summary' });
    }
}

const list = async (req, res) => {
    try {
        const summaryList = await Summary.find();

        return res.status(200).send({ summaryList });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading summaries' });
    }
}

const get = async (req, res) => {
    try {
        const requestedSummary = await Summary.findById(req.params.summaryId);

        return res.status(200).send({ requestedSummary });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading summary' });
    }
}

const update = async (req, res) => {
    try {
        const updatedSummary = await Summary.findByIdAndUpdate(req.params.summaryId, req.body, { new: true });

        return res.status(200).send({ updatedSummary });
    } catch (err) {
        return res.status(400).send({ error: 'Error updating summary' });
    }
}

const remove = async (req, res) => {
    try {
        await Summary.findByIdAndDelete(req.params.summaryId);

        return res.status(200).send({ message: 'Summary has been removed' });
    } catch (err) {
        return res.status(400).send({ error: 'Error removing summary' });
    }
}

const sleep = (ms) => {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
};

module.exports = { create, list, get, update, remove };