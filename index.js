const express = require('express');
const app = express();
const config = require('config');
const axios = require('axios');

require('./startup/routes')(app);
require('./startup/db')();

const port = process.env.PORT || config.get('port');

const server = app.listen(port, () => console.log(`listening on port ${port}..`));

module.exports = server;
