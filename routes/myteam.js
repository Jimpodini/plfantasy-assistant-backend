const express = require('express');
const router = express.Router();
var request = require('request');

router.get('/', async (req, res) => {
	//console.log(req.query);
	const username = req.query.username;
	const password = req.query.password;
	let options = {
		method: 'POST',
		url: 'https://users.premierleague.com/accounts/login/',
		headers: {
			'Postman-Token': '3b869df7-1405-4cd1-a61c-a9d39c19d765',
			'cache-control': 'no-cache',
			'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
		},
		formData: {
			password: password,
			login: username,
			redirect_uri: 'https://fantasy.premierleague.com/a/login',
			app: 'plfpl-web'
		}
	};

	request(options, function(error, response, body) {
		if (error) throw new Error(error);

		if (response.headers['set-cookie'] === undefined) {
			res.sendStatus(400);
			return;
		}

		////// hej
		const cookie = response.headers['set-cookie'];

		let options = {
			method: 'GET',
			url: 'https://fantasy.premierleague.com/a/login',
			headers: {
				'Postman-Token': '72b7b64a-143b-484e-a031-681e0537d8a5',
				'cache-control': 'no-cache',
				Cookie: cookie
			}
		};

		request(options, function(error, response, body) {
			if (error) throw new Error(error);

			const teamID = body.match(/a\/team\/(.*?)\/event/i)[1];
			//res.send(teamID);

			let options = {
				method: 'GET',
				url: `https://fantasy.premierleague.com/drf/my-team/${teamID}/`,
				headers: {
					'Postman-Token': 'bab10a92-7091-4ada-a0d7-ee9997682cd1',
					'cache-control': 'no-cache',
					Cookie: cookie
				}
			};

			request(options, function(error, response, body) {
				if (error) throw new Error(error);

				const cookie2 = response.headers['set-cookie'];

				let options = {
					method: 'GET',
					url: `https://fantasy.premierleague.com/drf/my-team/${teamID}/`,
					headers: {
						'Postman-Token': '934997fb-a1c5-43c1-8886-35ed4bd17e62',
						'cache-control': 'no-cache',
						Cookie: cookie.concat(cookie2)
					}
				};

				request(options, function(error, response, body) {
					if (error) throw new Error(error);

					const myDetails = JSON.parse(body);
					const myTeamID = myDetails.entry.id;
					const myPlayers = myDetails.picks;
					let playerIds = [];

					myPlayers.map((player) => (playerIds = [ ...playerIds, player.element ]));

					const teamObject = { myTeamID, playerIds };
					res.send(teamObject);
				});
			});
		});

		//////// hej
	});
});

module.exports = router;
