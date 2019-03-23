const express = require('express');
const router = express.Router();
const { Odds } = require('../models/odds');
const { Update } = require('../models/update');
const axios = require('axios');

router.get('/', async (req, res) => {
	const odds = await Odds.find({});
	res.send(odds);
});

router.post('/', async (req, res) => {
	try {
		await Update.deleteMany({});
		const update = new Update();
		await update.save();

		await Odds.deleteMany({});

		const odds = await axios.get(
			'https://api.the-odds-api.com/v3/odds?sport=soccer_epl&region=uk&mkt=h2h&apiKey=1ce4799731f1103191085e8481c0ff68'
		);

		console.log(odds.data.data);

		const allGames = odds.data.data;
		let allOdds = [];

		for (let i = 0; i < allGames.length; i++) {
			let game = odds.data.data[i];
			let teams = game.teams; // teams
			let gameOdds = game.sites.filter((s) => s['site_key'] === 'bet365');

			gameOdds = gameOdds.length == 0 ? [ 1, 1, 1 ] : gameOdds[0].odds.h2h;
			//[0].odds.h2h;

			let object = { teams: teams, odds: gameOdds };

			allOdds = [ ...allOdds, object ];
		}

		Odds.collection.insert(allOdds);

		res.send(allOdds);
	} catch (err) {
		console.log('catch block');
		console.log(err, err.message);
	}
});

module.exports = router;
