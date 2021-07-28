import React, { Component, useState } from 'react';
import { Link } from "react-router-dom";
import './forgot-password.sass';
import axios from 'axios';



function Forgotpassword() {

	const [email, setEmail] = useState('');
	const [msg, setMsg] = useState('');

	function handleMsg(msg) {
		if (msg.length > 0) {
			return <div className='logMsg'>{msg}</div>;
		}
	}

	function sendEmail(email) {
		const data = JSON.stringify({email: email});
		axios.post('/api/mail/pwdreset', data, { headers: {'Content-Type': 'application/json'} })
			.then(res => {
				setMsg(res.data);
			})
			.catch(error => {
				if (typeof error.response.data !== 'undefined') console.log(error.response.data);
			})
	}

	return (
		<div className="reset-container">
			<div id="resetTitle">Password Reset</div>
			<div id="resetMsg">
				Enter the email of your account. An email will be sent with a link to reset your password.
			</div>
			<input 
				type="text" 
				name="email" 
				placeholder="Enter your email" 
				onChange={e => setEmail(e.target.value)}
				/>
			<input 
				className="hp" 
				type="text" 
				name="email_two" 
				placeholder="Enter your email" 
				/>
			<button type="submit" name="reset-request-submit" onClick={() => sendEmail(email)}>Send password reset</button>
			{ handleMsg(msg) }
		</div>
	);
}


export default Forgotpassword;
