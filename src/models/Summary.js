const mongoose = require('../database');

const summarySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: [{
        type: String,
    }],
    status: {
        type: String,
        default: 'Pending',
    },
    languageCode: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Summary = mongoose.model('Summary', summarySchema);

module.exports = Summary;