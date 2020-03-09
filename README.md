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