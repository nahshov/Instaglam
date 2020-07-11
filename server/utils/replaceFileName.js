const { v4: uuid } = require('uuid');

const replaceFileNameWithUUID = originalname => {
  let filename;
  const extension = originalname.substring(originalname.lastIndexOf('.'));

  if (!(originalname.endsWith('mov') || originalname.endsWith('mp4'))) {
    filename = `${uuid()}${extension}`;
    return filename;
  }

  filename = `${uuid()}${extension}`;
  return filename;
};

module.exports = replaceFileNameWithUUID;
