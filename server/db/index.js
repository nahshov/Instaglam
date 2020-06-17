const mongoose = require('mongoose');
const { mongoUri } = require('../config');

module.exports = async function connect() {
  require('../models/User');
  require('../models/Post');
  require('../models/Like');
  require('../models/Comment');

  try {
    return mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
  } catch (e) {
    console.log('could not connect to mongo');
    process.exit(1);
  }
};
