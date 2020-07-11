const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now,
  },
  content: String,
  media: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true,
  },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
