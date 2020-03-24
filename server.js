const express = require('express')
const mongoose = require('mongoose')
const ShortUrlModel = require('./models/short_url')
const app = express()
const dotenv = require('dotenv/config')
const PORT = process.env.PORT || 5000;

let secret = {
    server : process.env.dbserver,
    database : process.env.dbname,
    user : process.env.user,
    password : process.env.password
};

// console.log(process.env.dbserver)
// console.log(process.env.dbname)
// console.log(process.env.user)
// console.log(process.env.password)

mongoose.connect(`mongodb+srv://${secret.user}:${secret.password}@${secret.server}/${secret.database}`,
    { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

// mongoose.connect('mongodb://localhost:27017/url_shortner',{
//     useNewUrlParser : true, useUnifiedTopology: true
// })

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

app.listen(PORT, () => console.info(`Server listening on ${PORT}`))

