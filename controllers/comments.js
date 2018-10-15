//controllers/comments.js
const Comment = require('../models/comment')

module.exports = (app) => {
  // NEW Comment
  app.post('/posts/comments', (req, res) => {
      Comment.create(req.body).then(comment => {
      res.redirect(`/posts/${comment.postId}`);
    }).catch((err) => {
      console.log(err.message);
    });
  })

  // DELETE
    app.delete('/posts/comments/:id', function (req, res) {
      console.log("DELETE comment")
      Comment.findByIdAndRemove(req.params.id).then((comment) => {
        res.redirect(`/posts/${comment.postId}`);
      }).catch((err) => {
        console.log(err.message);
      })
    })

}
