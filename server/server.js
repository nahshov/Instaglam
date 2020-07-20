const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { port } = require('./config');
const connect = require('./db');

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // error handling logic
  res.status(400).send('Bad request');
});

require('./routes/index.js')(app);

connect().then(() => {
  console.log('DB is connected');
  app.listen(port, () => {
    console.log('Server is up with express on port: ', port);
  });
});
