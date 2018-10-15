//models/comment.js

const mongoose = require('mongoose')

const Comment = mongoose.model('Comment', {
  title: String,
  content: String,
  postId: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'}
});

module.exports = Comment
