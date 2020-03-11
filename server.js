const express = require('express')
const mongoose = require('mongoose')
const ShortUrlModel = require('./models/short_url')
const app = express()

mongoose.connect('mongodb://localhost:27017/url_shortner',{
    useNewUrlParser : true, useUnifiedTopology: true
})

app.set('view engine','ejs')
app.use(express.urlencoded({ extended: false}))

//ignoring favicon request https://stackoverflow.com/questions/35408729/express-js-prevent-get-favicon-ico
app.use( function(req, res, next) {
    if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') 
      return res.sendStatus(204); // returning hence favicon req does not next() to '/' route
    next();
  });


app.use((req, res, next) => {
    logThings(`${req.method} ${req.originalUrl}`)
    next()
})

app.get('/', async (req, res) => {
    const shortUrls = await ShortUrlModel.find()
    res.render('index', { shortUrls: shortUrls })
})

app.post('/shortUrls', async (req, res) => {
    await ShortUrlModel.create({ full : req.body.fullUrl })
    res.redirect('/')
    logThings(`Storing full url: ${req.body.fullUrl}`)
})

app.get('/:shortUrl', async (req, res) => {
    const urlData = await ShortUrlModel.findOne({ short : req.params.shortUrl})
    // console.log(`shortUrl: ${req.params.shortUrl}`)
    if (urlData == null){
        logThings('!!! Error 404')
        return res.render('error', {errorCode: 404})
    }

    urlData.clicks++
    urlData.save()

    res.redirect(urlData.full)
    logThings(`Redirecting to ${urlData.full}`)
})

function logThings(logData){
    if(logData)
    console.log(`${new Date().toString()} => `,logData)
}

app.listen(process.env.PORT || 5000)

