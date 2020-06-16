const { bucket } = require('./google-cloud');
const { v4: uuid } = require('uuid');

const uploadMedia = (originalname, buffer) =>
  new Promise((resolve, reject) => {
    let filename;
    const toReplace = originalname.substring(originalname.lastIndexOf('.'));

    if (!(originalname.endsWith('mov') || originalname.endsWith('mp4'))) {
      filename =
        originalname.replace(toReplace, '').replace(/ /g, '_') +
        +'.' +
        uuid() +
        '.jpeg';
    } else {
      filename = uuid() + '.' + originalname;
    }

    const blob = bucket.file(filename);
    const blobStream = blob.createWriteStream({
      resumable: false
    });

    blobStream
      .on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

        resolve(publicUrl);
      })
      .on('error', (e) => {
        reject(`Unable to upload media, something went wrong`);
      })
      .end(buffer);
  });

module.exports = uploadMedia;
