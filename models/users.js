
const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({ 
	displayName: {type: 'string', min: 4, max: 100},
	pwd: {type: 'string'},
	email: {type: 'string'},
	about: {type: 'string', min: 50, max: 500},
	srcProfileImg: {type: 'string'},
	insta: {type: 'string'},
	yt: {type: 'string'},
	fb: {type: 'string'},
	web: {type: 'string'},
	twitter: {type: 'string'}
});



module.exports = mongoose.model('Users', userSchema);;




