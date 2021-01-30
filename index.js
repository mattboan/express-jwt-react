const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

//MySQL setup
const con = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_DB,
});

con.connect();

const saltRounds = 10;

//Allow static access to the front-end
app.use(express.static(`${__dirname}/front-end/build`));

//Match any route if a predefined route doesn't exist
app.get("/", function (req, res) {
	res.sendFile(`${__dirname}/front-end/build/index.html`);
});

app.get("/api/profile", auth.authenticateToken, function (req, res) {
	res.status(200).send("Welcome to the club!");
});

app.post("/api/register", auth.deauthenitcateToken, (req, res) => {
	console.log("/api/register");
	console.log("username: " + req.body.username);
	console.log("password: " + req.body.password);

	if (!req.body.username || !req.body.password) {
		res.json({ error: "error" });
	}

	bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
		con.query(
			"INSERT INTO Users (username, password) VALUES (?, ?)",
			[req.body.username, hash],
			function (err, result) {
				if (err) res.json({ success: false });
				res.json({ success: true });
			}
		);
	});
});

app.post("/api/login", (req, res) => {
	//Test to see what we are getting from the user
	console.log("createNewUser: " + JSON.stringify(req.body));

	con.query(
		"SELECT password FROM Users WHERE username = ?",
		[req.body.username],
		function (err, result) {
			bcrypt.compare(
				req.body.password,
				result[0].password,
				function (err, authed) {
					if (authed) {
						//If authenticated send back the jwt token
						const token = auth.generateAccessToken(
							{ username: req.body.username },
							process.env.TOKEN_SECRET
						);
						res.json({ token: token, status: "good" });
					} else {
						res.send({ status: "bad" });
					}
				}
			);
		}
	);
});

app.listen(process.env.PORT || 8080);
