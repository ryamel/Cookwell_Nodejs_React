import React, { Component } from "react";
import './contact.sass';
import Footer from '../components/footer';


const Contact = () => {
	return (
		<React.Fragment>
			<div className='faqBody minBodyHeight'>
				<h4 class="faqTitle">How to contact us</h4>
				<p class="faqExplain">Send us and email at cookwell.help@gmail.com</p>
			</div>
			<Footer isLoaded={true} />
		</React.Fragment>
	);
}

export default Contact;