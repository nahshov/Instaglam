const {
	googleStorageBucketName
} = require('../config');
const { Storage } = require('@google-cloud/storage');

const gc = new Storage({
	credentials: {
		client_email: process.env.GOOGLE_STORAGE_EMAIL,
		private_key: process.env.GOOGLE_STORAGE_SECRET
	}
});

const bucket = gc.bucket(googleStorageBucketName);

module.exports = {
	bucket
};
