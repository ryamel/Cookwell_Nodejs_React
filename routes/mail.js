
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const { Token } = require('../models/tokens');
const { User } = require('../models/users');
const { validatePwd, decrypt} = require('../functions');
const Recipe = require('../models/recipes');








router.post('/pwdReset', async (req, res) => {
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
			from: 'ff',
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







router.post('/pwdResetUpdate', async (req, res) => {
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








router.post('/contactAuthor', async (req, res) => {
	console.log('contactAuthor', req.body);
	try {
		// check bddy length
		if (req.body.emailBody.length < 5) return res.status(400).send('Email body too short, message not sent');

		// decrypt authid
		var authid = decrypt(req.body.authid);
	    if (!authid) return res.status(500).send();

		// get auth email
		let user = await User.findOne({_id: authid}).select('email name');

		// email details
		const subject = 'Cookwell - Edit Recipe';
		const from = process.env.mailAccount;
		const to = user.email;
		const html = 
			`<html>
				<head>
				    <style>
				    </style>
				</head>
				<body>
				    <p>Hello ${user.name},</p>
				    <p>
				    	At Cookwell we peform a quick review of all recipes uploaded for content, spelling/grammar, and photo quality. Sometimes we ask for corrections before we publish a recipe. 
				    	Please make the following corrections detailed at the end of this email for </br></br> ${req.body.rtitle} </br></br> Please reply to this email, notifying us of the corrections, and we will publish your recipe.</br></br>
				    </p>
				    <p>${req.body.emailBody}</p>
				</body>
			</html>`;

		// send Email
		let sent = await sendEmail(from, to, subject, html);
		if (!sent) return res.status(500).send('SMTP Connection Error');

		// set status of Sent Email
		await Recipe.findOneAndUpdate(
			{_id: req.body.rid},
			{contactedAuthor: true},
			function (err) {
	            if (err) return res.status(500).send('Email Sent, with server error');
	        })

		return res.status(200).send('Email sent!');
	}
	catch (err) {
		console.log(err);
		return res.status(400).send();
	}
})






// email function
const nodemailer = require("nodemailer");
const clientURL = "http://147.182.213.40:4000/";//const clientURL = "http://localhost:3000";
const smtpTransport = require('nodemailer-smtp-transport');// needed for hostgator (possible others smtp)


const sgMail = require('@sendgrid/mail');
async function sendEmail(fromEmail, toEmail, subject, htmlBody) {



// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
// javascrip
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);

	const msg = {
		to: 'rya_mel@hotmail.com', // Change to your recipient
		from: 'contact@cookwell.co', // Change to your verified sender
		subject: 'Sending with SendGrid is Fun',
		text: 'and easy to do anywhere, even with Node.js',
		html: '<strong>and easy to do anywhere, even with Node.js</strong>',
	}

	sgMail.send(msg)
		.then(() => {
			console.log('Email sent')
		})
		.catch((error) => {
			console.error(error)
		})

	return true;





	//let testAccount = await nodemailer.createTestAccount();
	// let transporter = nodemailer.createTransport(smtpTransport({
	// 	name: 'hostgator',
	// 	host: "ns6323.hostgator.com",
	// 	port: 465, // port allowd on ufw firewall
	// 	secure: true, // true for 465, false for other ports
	// 	auth: {
	// 		//user: testAccount.user, // generated ethereal user
	// 		user: process.env.mailAccount, // generated ethereal user
	// 		//pass: testAccount.pass, // generated ethereal password
	// 		pass: process.env.mailPwd, // generated ethereal password
	// 	},
	// }));

	// // verify connection configuration
	// transporter.verify(function (error, success) {
	// 	if (error) {
	// 		console.log(error);
	// 		return false;
	// 	} else {
	// 		console.log("Server is ready to take our messages");
	// 	}
	// });

	// let info = await transporter.sendMail({
	// 	from: fromEmail, // sender address
	// 	to: toEmail, // list of receivers
	// 	subject: subject, // Subject line
	// 	text: ``, // plain text body
	// 	html:  htmlBody
	// });

	// console.log(fromEmail, 'to...', toEmail);

	// return true;
	// console.log("Message sent: %s", info.messageId);
	//console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}









module.exports = router;