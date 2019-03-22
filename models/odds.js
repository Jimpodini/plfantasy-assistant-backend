const mongoose = require('mongoose');

const oddsSchema = new mongoose.Schema({
	teams: [ String ],
	odds: [ Number ]
});

const Odds = mongoose.model('Odds', oddsSchema);

exports.Odds = Odds;
