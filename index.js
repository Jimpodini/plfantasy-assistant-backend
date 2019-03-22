const express = require('express');
const app = express();
const config = require('config');
const axios = require('axios');

require('./startup/routes')(app);
require('./startup/db')();

const port = process.env.PORT || config.get('port');

const server = app.listen(port, () => console.log(`listening on port ${port}..`));

module.exports = server;

// async function run() {
// 	const data = await axios.get('http://localhost:3900/api/updates');

// 	const date = data.data.lastUpdated.substr(0, 10);

// 	console.log(date === '2019-03-01');
// }

// run();
