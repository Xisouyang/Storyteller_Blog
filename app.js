const express = require('express')
const methodOverride = require('method-override')
const app = express()

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/Storyteller_Blog', {useNewUrlParser: true})
var exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');

// The following line must appear AFTER const app = express() and before your routes!
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))


const Post = mongoose.model('Post', {
  title: String,
  description: String
});


// INDEX
app.get('/', (req, res) => {
  Post.find()
    .then(post => {
      res.render('post-index', { post: post });
    })
    .catch(err => {
      console.log(err);
    })
})

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
      res.render('posts-show', { post: post })
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
  Post.findOneAndDelete(req.params.id).then((post) => {
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})

app.listen(3000, () => {
    console.log("Listening Port 3000")
})
