const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());

// Load Routes
const summaryRoutes = require('./routes/summaryRoutes');

app.use(summaryRoutes);

module.exports = app