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
    ref: 'Post'
  },
  like: Number,
  content: {
    type: String,
    required: true
  },
  reply: {
    type: mongoose.Types.ObjectId,
    ref: 'Comment'
  }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
