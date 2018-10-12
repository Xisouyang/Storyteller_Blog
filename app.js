const express = require('express')
const app = express()
var exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
    // res.send('Hello-World')
    res.render('hello', {})
})

app.listen(3000, () => {
    console.log("Listening Port 3000")
})
