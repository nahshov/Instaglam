const { Storage } = require('@google-cloud/storage');
const path = require('path');

const gc = new Storage({
	keyFilename : path.join(__dirname, '../../dev1-263221-002724bbed5f.json'),
	projectId   : 'dev1-263221'
});
const bucket = gc.bucket('instaglam-bucket');

module.exports = bucket;
