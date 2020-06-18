require('dotenv').config();

module.exports = {
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/instaglam',
  port: process.env.PORT || 3000,
  tokenSecret: process.env.TOKEN_SECRET || 'mySecret',
  refreshTokenSecret: process.env.REFRESH_TOKEN || 'myRefresh',
  googleStorageCredentials: {
    // keyFilename: process.env.GOOGLE_STORAGE_KEYFILENAME,
    // projectId: process.env.GOOGLE_STORAGE_PROEJCT
    client_email:
      process.env.GOOGLE_STORAGE_EMAIL || process.env.GOOGLE_STORAGE_KEY,
    private_key: process.env.GOOGLE_STORAGE_SECRET
  },
  googleStorageBucketName: process.env.GOOGLE_STORAGE_BUCKET_NAME
};
