const { User, validateUser } = require('../models/users');
// const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();




router.post('/', async (req, res) => {

	// validate user using Joi
	const { error } = validateUser(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// check if user already exists
	let user = await User.findOne({email: req.body.email});
	if (user) return res.status(400).send('User already registered');

	// if all good. register new user
	user = new User({
		name: req.body.name,
		email: req.body.email,
		pwd: req.body.pwd,
		about: req.body.about,
		scrProfileImg: req.body.srcProfileImg,
		insta: req.body.insta,
		yt: req.body.yt,
		fb: req.body.fb,
		web: req.body.web,
		twitter: req.body.twitter
	})

	await user.save();
	
	res.send(user);

})


// router.post('/api/postusers/', async (req, res) => {
//     const user = new User({
//         displayName:  req.body.displayName,
//         pwd: req.body.pwd,
//         email: req.body.email,
//         about: req.body.about
//     });

//     try {
//         const userSave = await user.save();
//         res.status(201).json(userSave);
//     }
//     catch (err) {
//         res.status(400).json({message: err.message}); // client fucks up, send 400
//     }

// });



module.exports = router;