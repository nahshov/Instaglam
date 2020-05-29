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
