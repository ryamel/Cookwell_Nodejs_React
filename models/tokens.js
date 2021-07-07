
const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({ 
	userId: {
		type: 'ObjectId',
		required: true,
		ref: "User" // this field can only be populated by userIds from the Users documents
	},
	token: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date, 
		default: Date.now,
		expires: 3600 // expiry time of one hour 
	}
});


const Token = mongoose.model('Token', tokenSchema);

exports.Token = Token;



