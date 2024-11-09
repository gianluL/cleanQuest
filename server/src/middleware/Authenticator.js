
import jwt from "jsonwebtoken";

// const jwt = require("jsonwebtoken");

function verifyAuthorization(req, res, next) {
	// 1. Check if the token is in the headers
	const token = req.headers["authorization"];

	if (!token) {
		return res.status(401).json({ error: "Access denied." });
	}

	// 2. Check if the token is valid
	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		req.uid = decoded.id;
		req.username = decoded.username;
		next(); // Go to the next function
	} catch (error) {
		res.status(401).json({ error: "Access denied" });
	}
}

export default verifyAuthorization;
