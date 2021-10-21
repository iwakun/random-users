const express = require('express');
const axios = require('axios');
const app = express();
const port = 4000;

// Yeah, this is super insecure
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let users = [];

console.log('Fetching 5000 random users');
axios
	.get('https://randomuser.me/api/?results=5000')
	.then((response) => {
		users = response.data.results;
		console.log('Fetching 2000 random users');
		axios
			.get('https://randomuser.me/api/?results=2000')
			.then((response) => {
				users = [...users, ...response.data.results];
				console.log('Assigning userids');
				// We should use a legit unique ID here
				for(let i = 0; i < users.length; i++) {
					users[i].userid = i;
				}
				console.log('Ready to serve users');
			});
	})

app.get('/users', (req, res) => {
	res.header("Content-Type", "application/json");
	res.send(JSON.stringify(users));
});
app.get('/user/:userid', (req, res) => {
	res.header("Content-Type", "application/json");
	res.send(JSON.stringify(users[req.params.userid]));
});
app.get('/', (req, res) => {
	res.send('Home page -- not used. Use localhost:4000/users');
});

app.listen(port, () => {
	console.log(`Random Users Server listening at http://localhost:${port}`)
});
