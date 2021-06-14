import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './signup-page.sass';


class Signuppage extends React.Component {
	constructor() {
		super();
		this.state = {
			email: '',
			pwd: '',
			pwdRepeat: ''
		}

		this.signUpUser = this.signUpUser.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}

	signUpUser() {

		const postOptions = {
	        method: 'POST',
	        headers: { 'Content-Type': 'application/json' },
	        body: JSON.stringify({
	        	email: this.state.email,
	        	pwd: this.state.pwd,
	        	pwdRepeat: this.state.pwdRepeat
	        })
	    };

		fetch('/api/users/create', postOptions)
			.then(res => res.json())
			.then(data => console.log(data))
			.catch(error => console.log(error.errors));

	}

	handleInput(e) {
		let name = e.target.name;
		this.setState({
			[name]: e.target.value
		})
	}

	render () {
		return (
			<div className="signupForm-container">
				<input 
					type="text" 
					name="email" 
					placeholder="Email" 
					value={this.state.email}
					onChange={this.handleInput}
				/>
				<input 
					type="Password" 
					name="pwd" 
					placeholder="Password" 
					value={this.state.pwd}
					onChange={this.handleInput}
				/>
				<input 
					type="Password" 
					name="pwdRepeat" 
					placeholder="Repeat Password" 
					value={this.state.repeatPwd}
					onChange={this.handleInput}
				/>
				<button 
					onClick={this.signUpUser} 
					type="submit" 
					name="submit">
					Sign up
				</button>
				<div id="linkCon">
					<Link id="forgotpwd" to="/forgot-password">Forgot Password</Link>
				</div>
				<div id="accountLogin">
					Already have an account? <Link to="./login-page">Log in</Link>
				</div>
				<div id="policyMsg">
					<div id="border"></div>
					By signing up, you agree to our <Link to='/privacy-policy'>Terms of Service</Link>, <Link to='/privacy-policy'>Privacy Policy</Link>, and <Link to='/privacy-policy'>Cookies Policy</Link>
				</div>
			</div>
		);
	}
}



export default Signuppage;