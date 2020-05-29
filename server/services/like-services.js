const Like = require('../models/Like.js');

//get likes of a post
function getLikes(postId) {
    return Like.find({post: postId})
}

//add like to a post
function addLike(like) {
    like = new Like(like);
    return like.save(); 
}

//remove like from a post
function removeLike(postId) {
    return Like.findOneAndRemove({post: postId})
}


module.export = {
    getLikes,
    addLike,
    removeLike
}