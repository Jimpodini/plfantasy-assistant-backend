const mongoose = require('mongoose');

const updatedSchema = new mongoose.Schema({
	lastUpdated: { type: Date, default: Date.now }
});

const Update = mongoose.model('Update', updatedSchema);

exports.Update = Update;
