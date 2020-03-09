const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb://localhost:27017/url_shortner',{
    useNewUrlParser : true, useUnifiedTopology: true
})

app.set('view engine','ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/shortUrls', (req, res) => {

})

app.listen(process.env.PORT || 5000)

