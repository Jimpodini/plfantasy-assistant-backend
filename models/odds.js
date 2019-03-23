const mongoose = require('mongoose');

const oddsSchema = new mongoose.Schema({
	teams: [ String ],
	odds: [ {} ]
});

const Odds = mongoose.model('Odds', oddsSchema);

exports.Odds = Odds;
