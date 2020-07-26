require('dotenv').config({ encoding: 'utf8' });

module.exports = {
  mongoUri: process.env.NODE_ENV === 'production' ? process.env.MONGO_URI : 'mongodb://localhost:27017/instaglam',
  port: process.env.PORT || 4000,
  tokenSecret: process.env.TOKEN_SECRET || 'mySecret',
  refreshTokenSecret: process.env.REFRESH_TOKEN || 'myRefresh',
  cookieSecret: process.env.COOKIE_SECRET || 'myCookie',
  googleStorage: {
    config: {
      projectId: process.env.GOOGLE_STORAGE_PROJECT_ID,
      scopes: 'https://www.googleapis.com/auth/cloud-platform',
      credentials: {
        client_email: process.env.GOOGLE_STORAGE_EMAIL,
        private_key: process.env.GOOGLE_STORAGE_PRIVATE_KEY
      }
    },
    bucketName: process.env.GOOGLE_STORAGE_BUCKET_NAME
  }
};
