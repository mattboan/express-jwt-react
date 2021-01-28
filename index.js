const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const jwt = require("jsonwebtoken");

//Allow static access to the front-end
app.use(express.static(path.join(__dirname, "front-end")));

app.listen(process.env.PORT || 8080);
