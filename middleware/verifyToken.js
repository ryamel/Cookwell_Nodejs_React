const jwt = require('jsonwebtoken');
const config = require('config');
var cookieParser = require('cookie-parser');


function verifyToken(req, res, next) {
	try {
		const token = req.cookies['jwt'];
		if (!token) return res.status(401).send('Access denied. No valid token provided.');

		req.tokenData = jwt.verify(token, process.env.private_key); // returns payload. Because we pass this to the next end point or route. We modify the request object to append data for the next route
		next();
	}
	catch (error) {
		console.log(err);
		return res.status(400).send('Invalid token');
	}

}

module.exports = verifyToken;



