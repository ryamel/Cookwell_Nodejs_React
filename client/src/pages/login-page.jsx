import React, { Component, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './login-page.sass';
import { withRouter } from "react-router";
import PropTypes from "prop-types"; // needed for HC withRouter
import axios from 'axios';
let source;

function Loginpage(props) {

	const [email, setEmail] = useState('');
	const [pwd, setPwd] = useState('');
	const [msg, setMsg] = useState('');

	function handleMsg(msg) {
		if (msg.length > 0) {
			const timer = setTimeout(() => {
				setMsg(msg);
			}, 5500);
			return <div className='logMsg'>{msg}</div>;
		}
	}

	function login(email, pwd) {
		source = axios.CancelToken.source();
		const body = { email: email, password: pwd };

		axios.post('/api/users/login', body, {cancelToken: source.token} )
			.then(response => {
				localStorage['logged_in'] = true; // used to prevent logout on refresh
				props.login();
				props.history.push('/my-account'); // redirect using withRouter and prototypes import
			})
			.catch(error => {
				if (typeof error.response.data !== 'undefined') setMsg(error.response.data);
			})
	}

	useEffect(() => {
		if (source) {
			console.log('cancel');
			return () => source.cancel();
		}
	})


	return (
		<React.Fragment>
			<div className="loginContainer">
				{ handleMsg(msg) }
				<input 
					type="text" 
					name="email" placeholder="Email"
					value={email}
					onChange={e => setEmail(e.target.value)}
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
					onChange={e => setPwd(e.target.value)}
				/>
				<button 
					onClick={() => login(email, pwd)} 
					id="logInBtn" 
					type="submit" 
					name="submit-loginPage">Log in
				</button>
				<div id="forgotPwd">
					<Link to="/forgot-password">Forgot Password</Link>
				</div>
				<div id="signUp">
					Don't have an account? <Link to="/signup-page">Sign up</Link>
				</div>
			</div>
		</React.Fragment>
	);
}


const LoginpageWithRouter = withRouter(Loginpage);


export default LoginpageWithRouter;
//export default Loginpage;
