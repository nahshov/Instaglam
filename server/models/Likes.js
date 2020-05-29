const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
    created   : {
		type    : Date,
		default : Date.now
	},
    user: {
        type: String,
        required: true,
    },
    post: {
        type: String,
        required: true,
    } 
})

const Like = mongoose.model('Like', LikeSchema);

module.exports = Like;
