const bucket = require('../services/google-cloud');
const { v4: uuid } = require('uuid');

const uploadImage = (originalname, buffer) =>
	new Promise(
		(resolve, reject) => {
			let filename;

			if (
				!(originalname.endsWith('mov') || originalname.endsWith('mp4'))
			) {
				filename =
					originalname.split('.')[0].replace(/ /g, '_') +
					uuid() +
					'.' +
					'jpeg';
			}

			const blob = bucket.file(filename);
			const blobStream = blob.createWriteStream({
				resumable : false
			});
			blobStream
				.on('finish', () => {
					const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
					resolve(publicUrl);
				})
				.on('error', () => {
					reject(`Unable to upload image, something went wrong`);
				})
				.end(buffer);
		},
		(err, req, res, next) => {
			res.status(500).json({
				error   : err,
				message : 'Internal server error!'
			});
			next();
		}
	);

module.exports = uploadImage;
