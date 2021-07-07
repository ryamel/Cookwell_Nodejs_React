
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const { Token } = require('../models/tokens');
const { User } = require('../models/users');
const { validatePwd } = require('../middleware/validatePwd');
//"use strict";
const nodemailer = require("nodemailer");



const clientURL = "http://localhost:3000";



router.post('/pwd-reset', async (req, res) => {
	// check user exists
	let user = await User.findOne({email: req.body.email});
	if (!user) return res.status(200).send('No account found');

	// check is token already exisits, if so delete the token
	let token = await Token.findOne({ userId: user._id });
	if (token) await token.deleteOne();


	// generate token
	let resetToken = crypto.randomBytes(32).toString("hex");
	// hash generated token
	const salt = await bcrypt.genSalt(10);
	const hashToken = await bcrypt.hash(resetToken, salt);
	// link to reset pwd
	const link = `${clientURL}/reset-password?token=${resetToken}&uid=${user._id}`; // **************** clientUrl needs to be set
	// save token in DB
	await new Token({
		userId: user._id,
		token: hashToken,
		createdAt: Date.now(),
	}).save();
	// send link/token to user email
	async function sendEmail() {
		let testAccount = await nodemailer.createTestAccount();
		let transporter = nodemailer.createTransport({
			host: "smtp.ethereal.email",
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
			  user: testAccount.user, // generated ethereal user
			  pass: testAccount.pass, // generated ethereal password
			},
		});
		let info = await transporter.sendMail({
			from: '"Fred Foo 👻" <foo@example.com>', // sender address
			to: "rya_mel@hotmail.com", // list of receivers
			subject: "Hello ✔", // Subject line
			text: `A password reset was requested for Cookwell.co. Click the following to reset your password. If you did not request an email reset, please ignore this email. ${link}`, // plain text body
			html:  `<html>
						<head>
						    <style>
						    </style>
						</head>
						<body>
						    <p>Hello,</p>
						    <p>You requested to reset your password.</p>
						    <p> Please, click the link below to reset your password</p>
						    <a href="https://{{link}}">Reset Password</a>
						</body>
					</html>`
		});
		console.log("Message sent: %s", info.messageId);
		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	}

	sendEmail().catch(console.error);

	res.status(200).send('Email sent');
})



router.post('/pwd-reset-update', async (req, res) => {
	console.log(req.body);
	// valid pwd
	let err = validatePwd(req.body.pwd, req.body.pwdRepeat);
	if (err) return res.status(400).send(err)
	// check for token (dont have to compare expiry as mongoDB mongoose expires field controlls this. See Token model expiry field.)
	let tokenDoc = await Token.findOne({userId: req.body.uid});
	if (!tokenDoc) return res.status(400).send('Invalid or expired token, try requsting password reset again.')

	try {
		// check valid token
		const isValid = await bcrypt.compare(req.body.token, tokenDoc.token);
		if (!isValid) return res.status(400).send('Invalid or expired token, try requsting password reset again.');
		// hash pwd for update
		const salt = await bcrypt.genSalt(10);
	    const hashPwd = await bcrypt.hash(req.body.pwd, salt);
	    // update
		await User.updateOne({_id: req.body.uid}, { $set: {pwd: hashPwd} }, {new: true});
	} 
	catch (err) {
		return res.status(500).send('Server Error. Try again.');
	}
	// delete token
	await tokenDoc.deleteOne();

	res.status(200).send('Password Updated. Try logging in with your new password.');
})






module.exports = router;