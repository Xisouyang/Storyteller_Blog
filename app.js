const express = require('express')
const methodOverride = require('method-override')
const app = express()

var mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Storyteller_Blog', {useNewUrlParser: true})
var exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');

// The following line must appear AFTER const app = express() and before your routes!
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))


const Posts = require('./controllers/posts')(app);
const Comments = require('./controllers/comments')(app);
const Post = require('./models/post')
const Comment = require('./models/comment')

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("listening")
});


module.exports = app
