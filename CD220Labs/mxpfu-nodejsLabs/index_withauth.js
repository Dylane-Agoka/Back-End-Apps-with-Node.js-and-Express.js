const express = require('express');
const routes = require('./routes/users.js');
const jwt = require('jsonwebtoken');
const session = require('express-session');

const app = express();
const PORT = 5000;

// Initialize session middleware with options
app.use(session({ secret: "fingerpint", resave: true, saveUninitialized: true }));

// Middleware for user authentication
app.use("/user", (req, res, next) => {
	if (req.session.authorization) {
		let token = req.session.authorization['accessToken'];

		jwt.verify(token, "access", (err, user) => {
			if (!err) {
				req.user = user;
				next();
			} else {
				return res.status(403).json({ message: "User not authenticated" });
			}
		});

	} else {
		return res.status(403).json({ message: "User not logged in" });
	}
});

// Parse JSON request bodies
app.use(express.json());

// User routes
app.use("/user", routes);

// Login endpoint
app.post("/login", (req, res) => {
	const user = req.body.user;
	if (!user) {
		return res.status(404).json({ message: "Body Empty" });
	}
	
	let accessToken = jwt.sign(
		{ data: user },
		'access',
		{ expiresIn: 60 * 60 }
	);

	req.session.authorization = { accessToken }
	return res.status(200).send("User successfully logged in");
});

// Start server
app.listen(PORT, () => console.log("Server is running at port " + PORT));
