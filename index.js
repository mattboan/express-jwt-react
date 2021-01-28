const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const jwt = require("jsonwebtoken");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

//Allow static access to the front-end
app.use(express.static(path.join(__dirname, "front-end/public")));

//Match any route if a predefined route doesn't exist
app.get("*", function (req, res) {
	res.sendFile(path.join(__dirname, "front-end/public", "index.html"));
});

/**
 * TODO:
 *       - Add MySQL integration
 *       - Check if user exists
 *       - Add user, etc.
 *       - Connect on the front end
 */
app.post("/api/register", function (req, res) {
	const { email, password } = req.body;

	user.save(function (err) {
		if (err) {
			console.log(err);
			res.status(500).send(
				"Error registering new user please try again."
			);
		} else {
			res.status(200).send("Welcome to the club!");
		}
	});
});

app.listen(process.env.PORT || 8080);
