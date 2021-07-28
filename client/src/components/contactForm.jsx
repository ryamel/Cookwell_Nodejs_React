import React, { Component, useState, useEffect } from "react";
import './contactForm.sass';
import axios from 'axios';

const ContactForm = (props) => {

	const [subject, setSubject] = useState('');
	const [emailBody, setEmailBody] = useState('');

	const sendEmail = () => {
		const data = JSON.stringify({
			emailBody: emailBody,
			authorName: props.authName,
			authid: props.authid,
			userEmail: props.authorEmail,
			rtitle: props.rtitle
		});

		axios.post('/api/mail/editcontactauthor', data, { headers: {'Content-Type': 'application/json'} } )
			.then(res => {
				props.handleError(res.data)
			})
			.catch(err => {
				props.handleError(err.response.data);
			});

		props.setOpenMail(false);
	}



	return(
		<div id='contactForm'>
			<div id='authName'>To: {props.authName}</div>
			<button id='emailBtn' onClick={() => sendEmail()}>Send</button>
			<button id='closeMailBtn' onClick={() => props.setOpenMail(false) }> Close X </button>
			<textarea 
				value={emailBody}
				onChange={(e) => setEmailBody(e.target.value)}
				/>
		</div>
	);
}







export default ContactForm;