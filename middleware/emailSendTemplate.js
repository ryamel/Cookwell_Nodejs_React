
// send email template

async function sendEmail() {
	// Generate test SMTP service account from ethereal.email
	// Only needed if you don't have a real mail account for testing
	let testAccount = await nodemailer.createTestAccount();
	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
		  user: testAccount.user, // generated ethereal user
		  pass: testAccount.pass, // generated ethereal password
		},
	});
	// send mail with defined transport object
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
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
	// Preview only available when sending through an Ethereal account
	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}