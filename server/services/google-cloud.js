const {
  googleStorageCredentials: credentials,
  googleStorageBucketName,
} = require('../config');
const { Storage } = require('@google-cloud/storage');

const gc = new Storage({ credentials });
const bucket = gc.bucket(googleStorageBucketName);

const deleteFromBucket = async (url) => {
  const fileName = url.split(`${googleStorageBucketName}/`)[1];
  return bucket.file(fileName).delete();
};

module.exports = {
  bucket,
  deleteFromBucket,
};
