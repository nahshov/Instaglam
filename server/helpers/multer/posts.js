const multer = require('multer');

//defining multer's diskStorage:
const storage = multer.diskStorage({
	destination: function (req, file, callback) {
		//null if there's an error and path where we store the file:
		callback(null, './server/uploads/posts');
	},
	filename: function (req, file, callback) {
		//the date that we uploaded the file(replacing the ":" with "-" because of windows problem) with the originalname of the file:
		//toISOString document: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
		callback(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
	}
});

//rejecting a file if it's not the type of file we want:
const fileFilter = (req, file, cb) => {
	if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'video/mp4') {
        //second parameter is a boolean which will either save the file or reject it(true or false):
		cb(null, true);
	} else {
		cb(new Error('Type file is not supported!'), false);
	}
}

//a variable(upload) with everything multer related we defined above:
const upload = multer ({
	storage: storage,
	fileFilter: fileFilter
})

module.exports = upload;