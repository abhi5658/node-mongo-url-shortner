# node-mongo-url-shortner

### Steps involved:
- `npm init -y`
- `npm i express mongoose ejs`
- `npm i --save-dev nodemon`
- create `server.js`
- start script for dev in "scripts"
- serve root at `localhost:5000`
- create `views` directory
- create `index.ejs` -> create basic html -> add form, table
- add bootstrap cdn -> apply bootstrap to form, table
- `npm run start-dev` -> executes: nodemon server.js
- create directory `models` for storing db models
- create `short_url.js` and create schema for urls collection
- create mongodb connection in `server.js`