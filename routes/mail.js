
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const { Token } = require('../models/tokens');
const { User } = require('../models/users');
const { validatePwd, decrypt} = require('../functions');
const Recipe = require('../models/recipes');
// const mailgun = require("mailgun-js");







router.post('/pwdReset', async (req, res) => {
	console.log('pwd reset', req.body);
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
	const link = `https://www.cookwell.co/reset-password?token=${resetToken}&uid=${user._id}`; 
	// save token in DB
	await new Token({
		userId: user._id,
			token: hashToken,
			createdAt: Date.now(),
		}).save();


	const from = 'cookwell.rev@gmail.com';
	const to = req.body.email;
	const subject = "Password Reset - Cookwell";
	const html = 
			`<html>
				<head>
				    <style>
				    </style>
				</head>
				<body>
					<p>Hello,</p></br>
				    <p>A password reset was requested for this account from Cookwell.co. Click the following link to reset your password. If you did not request an email reset, please ignore this email.</p>
				    <p>${link}</p>
				</body>
			</html>`;
	
	// send Email
	let sent = await sendEmail(from, to, subject, html);
	if (!sent) return res.status(500).send('Server Error: Email not sent');

	res.status(200).send('Email sent');
})







router.post('/pwdResetUpdate', async (req, res) => {
	console.log('pwdResetUpdate', req.body);
	// valid pwd
	let errMsg = validatePwd(req.body.pwd, req.body.pwdRepeat);
	if (errMsg) return res.status(400).send(errMsg);
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
	console.log('contactAuthor');
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
		const from = 'cookwell.rev@gmail.com';
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
		if (!sent) return res.status(500).send('Error: Email not sent!');

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




async function sendEmail(fromEmail, toEmail, subject, htmlBody) {
	try {
		const DOMAIN = 'cookwell.co';
		var mailgun = require('mailgun-js')({ apiKey: process.env.api_key, domain: DOMAIN });
		var MailComposer = require('nodemailer/lib/mail-composer');
		 
		var mailOptions = {
			from: fromEmail,
			to: toEmail,
			subject: subject,
			html: htmlBody
		};
		 
		var mail = new MailComposer(mailOptions);
		 
		mail.compile().build((err, message) => {
		 
		    var dataToSend = {
		        to: toEmail,
		        message: message.toString('ascii')
		    };
		 
		    mailgun.messages().sendMime(dataToSend, (sendError, body) => {
		        if (sendError) {
		            console.log(sendError);
		            return;
		        }
		    });
		});
		return true;
	}
	catch (err) {
		console.log(err);
		return false;
	}
}


	// try {
	// 	const DOMAIN = 'cookwell.co';
	// 	const mg = mailgun({apiKey: process.env.api_key, domain: DOMAIN});
	// 	const data = {
	// 		from: fromEmail,
	// 		to: toEmail,
	// 		subject: subject,
	// 		text: htmlBody
	// 	};

	// 	await mg.messages().send(data);

	// 	return true;
	// }
	// catch (err) {
	// 	console.log(err);
	// 	return false;
	// }


	// // send link/token to user email
	// async function sendEmail() {
	// 	let testAccount = await nodemailer.createTestAccount();
	// 	let transporter = nodemailer.createTransport({
	// 		host: "smtp.ethereal.email",
	// 		port: 587,
	// 		secure: false, // true for 465, false for other ports
	// 		auth: {
	// 		  user: testAccount.user, // generated ethereal user
	// 		  pass: testAccount.pass, // generated ethereal password
	// 		},
	// 	});
	// 	let info = await transporter.sendMail({
	// 		from: 'ff',
	// 		to: "rya_mel@hotmail.com", // list of receivers
	// 		subject: "Hello ✔", // Subject line
	// 		text: `A password reset was requested for Cookwell.co. Click the following to reset your password. If you did not request an email reset, please ignore this email. ${link}`, // plain text body
	// 		html:  `<html>
	// 					<head>
	// 					    <style>
	// 					    </style>
	// 					</head>
	// 					<body>
	// 					    <p>Hello,</p>
	// 					    <p>You requested to reset your password.</p>
	// 					    <p> Please, click the link below to reset your password</p>
	// 					    <a href="https://{{link}}">Reset Password</a>
	// 					</body>
	// 				</html>`
	// 	});
	// 	console.log("Message sent: %s", info.messageId);
	// 	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	// }
	// sendEmail().catch(console.error);






module.exports = router;