# node-mongo-url-shortner

### Steps involved:
- `npm init -y`
- `npm i express mongoose ejs`
- `npm i --save-dev nodemon`
- create `server.js`
- start script for dev in "scripts"
- serve root at `localhost:5000`
- `npm run start-dev` -> executes: nodemon server.js
- create `views` directory
- create `index.ejs` -> create basic html -> add form, table -> run
- add bootstrap cdn -> apply bootstrap to form, table -> run
- create directory `models` for storing db models
- create `short_url.js` and create schema for urls collection
- create mongodb connection in `server.js` -> run check
- `npm i shortid` creates unique short identifier
- add shortid property in schema
- add app.use for express urlencode
- create POST /shortUrls route for taking in URL requests
- create new object in post request and then redirect -> run
- add find all short urls in serving root and pass as parameter to index file
- use shortUrls obejct to fill table to show urls from server -> run
- create new route for redirecting shortUrl at end of `server.js`
- find url based on shortUrl, add click, save, redirect if not null -> run
- create error page in views
- when short url does not exist, render error with response
- added app use to send response 204 for favicon request and shifted route log below this
- install dotenv `npm i dotenv`
- create .env file for storing db credentials
- provide arguments to database call using process.env.VARIABLE_NAME
- issue faced: whenever `username` used as a env variable,  when invoked gave first letter capital of corresponding value. e.g. admin -> Admin
- :: hence using `user` in this case in environment variables

#### Begins heroku deployment:
- create heroku account
- install heroku CLI
- goto local project git directory
- login into heroku cli : `heroku login`
- enter credentials -> login success
- heroku starts server on port 5000! the code has been designed to accept port from external environment
- create heroku project: `heroku create app_name` : `heroku create short-url-abhi` : this creates a git project named short-url-abhi assosiated to heroku
- goto heroku dashboard -> app -> settings -> config vars : add .env variables
- push commited project to heroku master branch : `git push heroku master` : makes the project live at returned url