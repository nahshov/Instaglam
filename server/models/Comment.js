const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  post: {
    type: mongoose.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  like: Number,
  content: {
    type: String,
    required: true
  }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
