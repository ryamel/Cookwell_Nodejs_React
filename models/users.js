
const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

// const socialSchema = new mongoose.Schema({ 
// 	insta: 'string',
// 	yt: 'string',
// 	fb: 'string',
// 	web: 'string',
// 	tw: 'string'
// });

const userSchema = new mongoose.Schema({ 
	name: {
		type: 'string', 
		minLength: 3,
		maxLength: 100 
	},
	pwd: {
		type: 'string',
		required: true
	},
	email: {
		type: 'string',
		unique: true,
		required: true
	},
	admin: 	{
		type: 'boolean',
		required: true,
		default: false
	},
	about: {
		type: 'string', 
		maxLength: 500
	},
	profileImg: {
		type: 'string'
	}
	// socialLinks: {
	// 	type: {socialSchema}
	// }
});


// document instance method... see mongoose docs
// this gives a method to the resulting object from calling the constructor. I.e 'new User'
userSchema.methods.generateAuthToken = function() {
	// sign argument is what is in the payload of the jwt. Second argument is the private key
	const token = jwt.sign({ _id: this._id, email: this.email, admin: false }, process.env.private_key);
	return token;
}

const User = mongoose.model('User', userSchema);


// validate function
// function validateUser(user) {
// 	const schema = {
// 		name: Joi.string().min(4).max(100).required(),
// 		pwd: Joi.string().min(8).max(255).required(),
// 		email: Joi.string().min(8).max(255).required().email()
// 		// about: Joi.string().min().max().required().unqiue(),
// 		// srcProfileImg: Joi.string().min().max().required().unqiue(),
// 		// insta: Joi.string().min().max().required().unqiue(),
// 		// yt: Joi.string().min().max().required().unqiue(),
// 		// fb: Joi.string().min().max().required().unqiue(),
// 		// web: Joi.string().min().max().required().unqiue(),
// 		// twitter: Joi.string().min().max().required().unqiue()
// 	};

// 	return Joi.validate(user, schema); // will return either an error or true
// }



exports.User = User;
//exports.validateUser = validateUser;



