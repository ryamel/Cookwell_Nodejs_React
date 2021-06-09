
const mongoose = require('mongoose');
const Joi = require('Joi');


const User = mongoose.model('User', new mongoose.Schema({ 
	name: {
		type: 'string', 
		min: 4,
		max: 100,
		required: true
	},
	pwd: {
		type: 'string',
		min: 8,
		required: true
	},
	email: {
		type: 'string',
		unique: true,
		required: true
	},
	about: {
		type: 'string', 
		max: 500
	},
	srcProfileImg: {
		type: 'string'
	},
	insta: {
		type: 'string'
	},
	yt: {
		type: 'string'
	},
	fb: {
		type: 'string'
	},
	web: {
		type: 'string'
	},
	twitter: {
		type: 'string'
	}
}));


// validate function
function validateUser(user) {
	const schema = {
		name: Joi.string().min(4).max().required().unqiue(),
		pwd: Joi.string().min(8).required(),
		email: Joi.string().required().unqiue()
		// about: Joi.string().min().max().required().unqiue(),
		// srcProfileImg: Joi.string().min().max().required().unqiue(),
		// insta: Joi.string().min().max().required().unqiue(),
		// yt: Joi.string().min().max().required().unqiue(),
		// fb: Joi.string().min().max().required().unqiue(),
		// web: Joi.string().min().max().required().unqiue(),
		// twitter: Joi.string().min().max().required().unqiue()
	}

	return Joi.validate(user, schema); // will return either an error or true
}



exports.User = User;
exports.validateUser = validateUser;




