const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
    created   : {
		type    : Date,
		default : Date.now
	},
    userID: {
        type: String,
        required: true,
    },
    postID: {
        type: String,
        required: true,
    } 
})

const Like = mongoose.model('Like', LikeSchema);

module.exports = Like;
