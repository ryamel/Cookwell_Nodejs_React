import React, { Component, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './login-page.sass';
import { withRouter } from "react-router";
import PropTypes from "prop-types";


// i tried using functionalc component insead of class component to complete a form. Just for kicks

// local storage for jwt

function Loginpage(props) {

	const [email, setEmail] = useState('');
	const [pwd, setPwd] = useState('');


	function recordEmail(email) {
		setEmail(email);
	}

	function recordPwd(pwd) {
		setPwd(pwd);
	}

	function login(email, pwd) {
		const postOptions = {
		        method: 'POST',
		        headers: { 'Content-Type': 'application/json' },
		        body: JSON.stringify({
		        	email: email,
		        	password: pwd
		        })
		    };

		fetch('/api/users/login', postOptions)
			.then(res => res.json())
			.then(data => {
				localStorage['logged_in'] = true;
				props.login();
				props.history.push('/'); // redirect using withRouter and prototypes import
			})
			.catch((error) => console.log(error));

	}


	return (
		<React.Fragment>
			<div className="loginContainer">
				<input 
					type="text" 
					name="email" placeholder="Email"
					value={email}
					onChange={e => recordEmail(e.target.value)}
				/>
				<input 
					className="hp" 
					type="text" name="email_two" placeholder="Email"
				/>
				<input 
					type="Password" 
					name="pwd" 
					placeholder="Password"
					value={pwd}
					onChange={e => recordPwd(e.target.value)}
				/>
				<button 
					onClick={() => login(email, pwd)} 
					id="logInBtn" 
					type="submit" 
					name="submit-loginPage">Log in
				</button>
				<div id="forgotPwd">
					<Link to="/forgot-passsword">Forgot Password</Link>
				</div>
				<div id="signUp">
					Don't have an account? <Link to="/signup-page">Sign up</Link>
				</div>
			</div>

{/*			<div className='accEditErrMsg-banner'>

			</div>*/}
		</React.Fragment>
	);
}


const LoginpageWithRouter = withRouter(Loginpage);


export default LoginpageWithRouter;
