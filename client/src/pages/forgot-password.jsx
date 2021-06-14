import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './forgot-password.sass';



function Forgotpassword() {


	return (
		<div className="reset-container">
			<div id="resetpwdForm">
				<div id="resetTitle">Password Reset</div>
				<div id="resetMsg">
					Enter the email associated with your account and we will send you an email containing a link to reset your password.
				</div>
				<input type="text" name="email" placeholder="Enter your email" />
				<input className="hp" type="text" name="email_two" placeholder="Enter your email" />
				<button type="submit" name="reset-request-submit">Send password reset</button>
			</div>
		</div>
	);
}


export default Forgotpassword;
