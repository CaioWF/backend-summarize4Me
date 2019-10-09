const mongoose = require('mongoose');

require('dotenv').config();

mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;