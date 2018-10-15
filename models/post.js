//models/post.js

const mongoose = require('mongoose')

const Post = mongoose.model('Post', {
  title: String,
  description: String
});

module.exports = Post
