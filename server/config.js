require('dotenv').config();

module.exports = {
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/instaglam',
  port: process.env.PORT || 4000,
  tokenSecret: process.env.TOKEN_SECRET || 'mySecret',
  refreshTokenSecret: process.env.REFRESH_TOKEN || 'myRefresh',
  googleStorageCredentials: {
    client_email:
      process.env.GOOGLE_STORAGE_EMAIL || process.env.GOOGLE_STORAGE_KEY,
    private_key: process.env.GOOGLE_STORAGE_SECRET
  },
  googleStorageBucketName: process.env.GOOGLE_STORAGE_BUCKET_NAME
};
