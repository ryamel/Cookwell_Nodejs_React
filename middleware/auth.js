const jwt = require('jsonwebtoken');
const config = require('config');
var cookieParser = require('cookie-parser');

// middleware
// only checks for valid token


function auth(req, res, next) {
	// console.log(req.headers.cookie);
	//console.log('Cookies: ', req.cookies); // cookie parser ass .cookies method to req
	const token = req.cookies['jwt'];

	if (!token) return res.status(401).json('Access denied. No token provided.');

	try {
		const payload = jwt.verify(token, config.get('jwtPrivateKey')); // returns payload
		req.userPayload = payload; // because we pass this to the next end point or route. We modify the request object to append data for the next route
		next();
	}
	catch (error) {
		res.status(400).json('Invalid token');
	}

}

module.exports = auth;





// use middlware function for determining if user is authorized
router.post('/', auth, async (req, res) => {
	console.log('success! I am authorized');
	console.log(req.userPayload);
})

