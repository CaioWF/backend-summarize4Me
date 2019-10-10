// const Summary = require('../models/Summary');
const summarizationController = require('./summarizationController');

const s3Service = require('../services/s3Service');

const saveFileLocally = require('../utils/saveFileLocally');

const formidable = require('formidable');
const fs = require('fs');

const create = async (req, res) => {
    try {
        // const newSummary = await Summary.create(req.body);
        
        newSummary = {
            id: 1,
            title: 'Testing',
            content: [],
            status: 'Pending',
            languageCode: 'pt-br',
            createdAt: ''
        }

        let form = new formidable.IncomingForm();
        form.parse(req, (error, fields, files) => {
            let oldPath = files.file.path;
            let newPath = 'C:\\Users\\publi\\Downloads\\test\\' + files.file.name;

            fs.rename(oldPath, newPath, (err) => {
                if (err) throw err;
            });

            s3Service.uploadFile('summarize4me-files/audios', newPath);
        });

        // summarizationController.summarizationProccess(newSummary, req.file.location);

        return res.status(201).send({ newSummary });
    } catch (err) {
        console.log(err);
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

module.exports = { create, list, get, update, remove };