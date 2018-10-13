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


const posts = require('./controllers/posts')(app);


app.listen(3000, () => {
    console.log("Listening Port 3000")
})

module.exports = app
