const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

function authenticateToken(req, res, next) {
	// Gather the jwt access token from the request header
	console.log(req.headers);
	const authHeader = req.headers["authorization"];
	console.log("authHeader: " + authHeader);
	const token = authHeader && authHeader.split(" ")[1];
	if (token == null) return res.sendStatus(401); // if there isn't any token

	console.log("Token: " + token);

	jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
		console.log(err);
		if (err) return res.sendStatus(403);
		req.user = user;
		console.log("User: " + JSON.stringify(user));
		return next(); // pass the execution off to whatever request the client intended
	});
}

function deauthenitcateToken(req, res, next) {
	const authHeader = req.headers["authorization"];
	console.log("authHeader: " + authHeader);
	const token = authHeader && authHeader.split(" ")[1];
	if (token === undefined || token == null) {
		return next();
	}

	console.log("Token: " + token);
	jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
		console.log(err);
		if (err) return res.sendStatus(403);
		req.user = user;

		return res.sendStatus(403);
	});
}

function generateAccessToken(username, secret) {
	return jwt.sign(username, secret, { expiresIn: "60s" });
}

const auth = {
	authenticateToken: authenticateToken,
	generateAccessToken: generateAccessToken,
	deauthenitcateToken: deauthenitcateToken,
};
module.exports = auth;
