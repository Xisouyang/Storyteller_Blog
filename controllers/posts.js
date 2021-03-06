//controllers/posts.js
const Post = require('../models/post')
const Comment = require('../models/comment')

module.exports = function(app) {

  app.get('/', (req, res) => {
    Post.find()
      .then(post => {
        res.render('post-index', {post: post});
      })
      .catch(err => {
        console.log(err);
      });
  });

  // NEW
  app.get('/posts/new', (req, res) => {
    res.render('posts-new', {});
  })

  // CREATE
  app.post('/posts', (req, res) => {
    console.log(req.body);
    Post.create(req.body).then((post) => {
        res.redirect(`/posts/${post._id}`)
    }).catch((err) => {
        console.log(err.message)
    })
    // res.render('reviews-new', {});
  })

  // SHOW
  app.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id).then((post) => {
        console.log(post)
        Comment.find({ postId: req.params.id }).then(comments => {
            console.log(comments)
            res.render('posts-show', { post: post, comments: comments })
        })
    }).catch((err) => {
        console.log(err.message)
    })
  });

  // EDIT
  app.get('/posts/:id/edit', (req, res) => {
    Post.findById(req.params.id, function(err, post) {
      res.render('posts-edit', { post: post });
    })
  })

  // UPDATE
  app.put('/posts/:id', (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body)
      .then(post => {
        res.redirect(`/posts/${post._id}`)
      })
      .catch(err => {
        console.log(err.message)
      })
  })

  // DELETE
  app.delete('/posts/:id', function (req, res) {
    // console.log("DELETE post")
    Post.findByIdAndRemove(req.params.id).then((post) => {
      res.redirect('/');
    }).catch((err) => {
      console.log(err.message);
    })
  })
}
