const {
  googleStorageCredentials: credentials,
  googleStorageBucketName
} = require('../config');
const { Storage } = require('@google-cloud/storage');
const path = require('path');

const gc = new Storage({
  keyFilename: path.join(__dirname, `../${credentials.keyFilename}`),
  projectId: credentials.projectId
});
const bucket = gc.bucket(googleStorageBucketName);

module.exports = {
  bucket
};
