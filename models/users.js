
const mongoose = require('mongoose');
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
		maxLength: 100,
		default: ''
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
		maxLength: 500,
		default: ''
	},
	profileImg: {
		type: 'string',
		default: ''
	}
	// socialLinks: {
	// 	type: {socialSchema}
	// }
});


// document instance method... see mongoose docs
// this gives a method to the resulting object from calling the constructor. I.e 'new User'
userSchema.methods.generateAuthToken = function() {
	// sign argument is what is in the payload of the jwt. Second argument is the private key
	const token = jwt.sign({ _id: this._id, email: this.email, admin: this.admin }, process.env.private_key);
	return token;
}

const User = mongoose.model('User', userSchema);



exports.User = User;
//exports.validateUser = validateUser;



