const express = require('express');
const { port } = require('./config');
const connect = require('./db');

const app = express();

app.use(express.json({ extended: false }));

app.use(function (err, req, res, next) {
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
