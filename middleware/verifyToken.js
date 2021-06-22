const jwt = require('jsonwebtoken');
const config = require('config');
var cookieParser = require('cookie-parser');

// verifyToken looks for the jwt token in cookies. Validates it. And puts the payload data into the request object as <req.tokenData>


function verifyToken(req, res, next) {

	const token = req.cookies['jwt'];

	if (!token) return res.status(401).json('Access denied. No valid token provided.');

	try {
		const tokenData = jwt.verify(token, config.get('jwtPrivateKey')); // returns payload
		req.tokenData = tokenData; // because we pass this to the next end point or route. We modify the request object to append data for the next route
		next();
	}
	catch (error) {
		res.status(400).json('Invalid token');
	}

}

module.exports = verifyToken;



