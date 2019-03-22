const express = require('express');
const router = express.Router();
const { Update } = require('../models/update');

router.get('/', async (req, res) => {
	const update = await Update.findOne();
	res.send(update);
});

router.delete('/', async (req, res) => {
	const updates = await Update.delete();

	if (!updates) return res.status(404).send('No updates to remove');

	res.send(updates);
});

router.post('/', async (req, res) => {
	Update.deleteMany({}).catch((err) => console.log(err));
	const update = new Update({ lastUpdated: new Date() });
	//console.log(new Date());
	await update.save();
	res.send(update);
});

router.put('/', async (req, res) => {
	const update = await Update.findOneAndUpdate({}, { lastUpdated: new Date() });
	res.send(update);
});

module.exports = router;
