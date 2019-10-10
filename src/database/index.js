const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;