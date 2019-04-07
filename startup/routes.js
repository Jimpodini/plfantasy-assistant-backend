const cors = require('cors');
const updates = require('../routes/updates');
const odds = require('../routes/odds');
const myteam = require('../routes/myteam');

module.exports = function(app) {
	app.use(cors());
	app.use('/api/updates', updates);
	app.use('/api/odds', odds);
	app.use('/api/myteam', myteam);
};
