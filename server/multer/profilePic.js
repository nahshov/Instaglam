const multer = require('multer');

//a variable(profilePic) with everything multer related we defined above:
const profilePic = multer({
	storage    : multer.memoryStorage(),
	limits     : {
		fileSize : 1000000
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|png|bmp)$/g)) {
			return cb(new Error('Please upload an image'));
		}
		cb(null, true);
	}
});

module.exports = profilePic;
