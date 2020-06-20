const { Storage } = require('@google-cloud/storage');

const {
  googleStorageCredentials: credentials,
  googleStorageBucketName
} = require('../config');

const gc = new Storage({
  credentials
});

const bucket = gc.bucket(googleStorageBucketName);

module.exports = {
  bucket
};
