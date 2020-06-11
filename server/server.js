const express = require('express');
const bodyParser = require('body-parser');
const { port } = require('./config');
const connect = require('./db');
// const swagger = require('swagger-node-express');

const app = express();

app.use(bodyParser.json());
// swagger.setAppHandler(app);

app.use(function(err, req, res, next) {
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
