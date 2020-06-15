const multer = require('multer');

const postsHandler = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|bmp|mov|mp4)$/g)) {
      return cb(new Error('Please upload an image/video'));
    }
    cb(null, true);
  },
});

module.exports = postsHandler;
