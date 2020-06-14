require('dotenv').config();


module.exports = {
	mongoUri:
		process.env.MONGO_URI || 'mongodb://localhost:27017/instaglam',
	port: process.env.PORT || 3000,
	tokenSecret: process.env.TOKEN_SECRET || 'mySecret',
	refreshTokenSecret: process.env.REFRESH_TOKEN || 'myRefresh',
	googleStorageCredentials: {
		client_email: process.env.GOOGLE_STORAGE_KEY || process.env.GOOGLE_STORAGE_EMAIL,
		private_key: process.env.GOOGLE_STORAGE_SECRET
	},
	googleStorageBucketName: process.env.BUCKET_NAME
};
