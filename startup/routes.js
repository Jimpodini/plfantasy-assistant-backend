const updates = require('../routes/updates');
const cors = require('cors');
const odds = require('../routes/odds');
const express = require('express');
const router = express.Router();

module.exports = function(app) {
	app.use(cors());
	app.use('/api/updates', updates);
	app.use('/api/odds', odds);
};
