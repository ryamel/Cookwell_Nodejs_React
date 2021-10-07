
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

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
});


userSchema.methods.generateAuthToken = function() {
	const token = jwt.sign({ _id: this._id, email: this.email, admin: this.admin }, process.env.private_key);	// sign() contains payload of jwt. Second argument is private key
	return token;
}

const User = mongoose.model('User', userSchema);

exports.User = User;



