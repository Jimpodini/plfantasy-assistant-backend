const updates = require('../routes/updates');
const odds = require('../routes/odds');
const express = require('express');
const router = express.Router();

module.exports = function(app) {
	app.use(
		'/',
		router.get('/', (req, res) => {
			res.send('Hej');
		})
	);
	app.use('/api/updates', updates);
	app.use('/api/odds', odds);
};
