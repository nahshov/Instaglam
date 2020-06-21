require('dotenv').config();

module.exports = {
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/instaglam',
  port: process.env.PORT || 4000,
  tokenSecret: process.env.TOKEN_SECRET || 'mySecret',
  refreshTokenSecret: process.env.REFRESH_TOKEN || 'myRefresh',
  googleStorageCredentials: {
    keyFilename: process.env.GOOGLE_STORAGE_KEYFILENAME,
    projectId: process.env.GOOGLE_STORAGE_PROEJCT
  },
  googleStorageBucketName: process.env.GOOGLE_STORAGE_BUCKET_NAME
};
