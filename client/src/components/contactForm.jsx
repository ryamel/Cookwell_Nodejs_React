import React, { Component, useState, useEffect } from "react";
import './contactForm.sass';
import axios from 'axios';

const ContactForm = (props) => {

	const [subject, setSubject] = useState('');
	const [emailBody, setEmailBody] = useState('');

	const sendEmail = () => {
		const body = {
			emailBody: emailBody,
			authid: props.authid,
			rtitle: props.rtitle,
			rid: props.rid
		};

		axios.post('/api/mail/contactAuthor', body)
			.then(res => {
				props.handleError(res.data);
			})
			.catch(err => {
				props.handleError(err.response.data);
			});

		props.setOpenMail(false);
	}



	return(
		<div id='contactForm'>
			<div id='authName'><b>Email Author of:</b> <i>{props.rtitle}</i></div>

			<button id='emailBtn' onClick={() => sendEmail()}>
				Send
			</button>

			<button id='closeMailBtn' onClick={() => props.setOpenMail(false) }> 
				Close X 
			</button>

			<textarea 
				value={emailBody}
				onChange={(e) => setEmailBody(e.target.value)}
				/>
		</div>
	);
}







export default ContactForm;