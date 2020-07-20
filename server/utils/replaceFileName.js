const { v4: uuid } = require('uuid');

const replaceFileNameWithUUID = originalname => {
  const extension = originalname.substring(originalname.lastIndexOf('.'));

  if (originalname.endsWith('mov') || originalname.endsWith('mp4')) {
    return `${uuid()}${extension}`;
  }

  return `${uuid()}.jpeg`;
};

module.exports = replaceFileNameWithUUID;
