import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './signup-page.sass';
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import axios from 'axios';

class Signuppage extends React.Component {
	constructor(props) {
		super();
		this.state = {
			email: '',
			pwd: '',
			pwdRepeat: '',
			errMsg: ''
		}

		this.registerUser = this.registerUser.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.handleError = this.handleError.bind(this);
	}

	registerUser() {
	    const data = {
	    	email: this.state.email,
	        pwd: this.state.pwd,
	        pwdRepeat: this.state.pwdRepeat
	    }

		axios.post('/api/users/register', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' }  })
			.then(res => {
				localStorage['logged_in'] = true;
				this.props.login();
				this.props.history.push('/my-account'); // redirect using withRouter and prototypes import
			})
			.catch(error => {
				if (typeof error.response.data !== 'undefined') this.setState({errMsg: error.response.data});
			})
	}

	handleInput(e) {
		let name = e.target.name;
		this.setState({
			[name]: e.target.value
		})
	}

	handleError(msg){
		if (msg.length > 0) {
			const timer = setTimeout(() => {
				this.setState({	error: '' });
			}, 5500);
			return <div className='logMsg'>{msg}</div>; // output msg
		}
	}

	render () {
		return (
			<div className="signupForm-container">
				{ this.handleError(this.state.errMsg)}
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
					onClick={this.registerUser} 
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

const SignuppageWithRouter = withRouter(Signuppage);

export default SignuppageWithRouter;