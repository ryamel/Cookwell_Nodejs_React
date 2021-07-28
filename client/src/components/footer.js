import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './footer.sass';

const Footer = (props) => {
	if (!props.isLoaded) {
		return null;
	} else {
		return (
			<div id="footer-container">
		  		<Link to='/contact'>Contact</Link>
		  		<span>|</span>
		  		<Link to='/privacy-policy'>Privacy Policy & Terms of Service</Link>
		        <span>|</span>
		        <Link to='/faq'>FAQ</Link>
			</div>
		);
	}
}


export default Footer;