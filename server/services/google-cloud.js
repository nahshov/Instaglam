const { Storage } = require('@google-cloud/storage');
const path = require('path');
const {
  googleStorageCredentials: credentials,
  googleStorageBucketName
} = require('../config');

const gc = new Storage({
  // keyFilename: path.join(__dirname, `../${credentials.keyFilename}`),
  // projectId: credentials.projectId
  credentials
});

const bucket = gc.bucket(googleStorageBucketName);

module.exports = {
  bucket
};
