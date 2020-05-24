const mongoose = require('mongoose');
const { mongoUri } = require('../config');

module.exports = async function connect() {
	require('../models/User');

	try {
		return mongoose.connect(mongoUri, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
	} catch (e) {
		console.log('could not connect to mongo');
		process.exit(1);
	}
};
