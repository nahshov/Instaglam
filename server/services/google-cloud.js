const { Storage } = require('@google-cloud/storage');
const path = require('path');
require('dotenv').config();


const gc = new Storage({
	keyFilename : path.join(__dirname, '../../dev1-263221-7258d8ee70b0.json'),
	projectId   : process.env.PROJECT_ID
});
const bucket = gc.bucket(process.env.BUCKET_NAME);
console.log(bucket)
const deleteFromBucket = async url => {
	const fileName = url.split(`${process.env.BUCKET_NAME}/`)[1];
	return bucket.file(fileName).delete();
};

module.exports = {
	bucket,
	deleteFromBucket
};
