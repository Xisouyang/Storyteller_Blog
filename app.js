const express = require('express')
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


const Post = mongoose.model('Post', {
  title: String,
  description: String
});


// INDEX
app.get('/', (req, res) => {
  Post.find()
    .then(posts => {
      res.render('post-index', { posts: posts });
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
      res.redirect('/')
  }).catch((err) => {
      console.log(err.message)
  })
  // res.render('reviews-new', {});
})

app.listen(3000, () => {
    console.log("Listening Port 3000")
})
