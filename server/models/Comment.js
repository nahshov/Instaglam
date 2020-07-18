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
  likes: {
    type: Number,
    default: 0
  },
  content: {
    type: String,
    required: true
  },
  replyToComment: {
    type: mongoose.Types.ObjectId,
    ref: 'Comment'
  },
  isReply: {
    type: Boolean,
    default: false
  }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
