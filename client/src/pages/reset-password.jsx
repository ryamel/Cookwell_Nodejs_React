import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './reset-password.sass';
import axios from 'axios';
let source;

// load url params

// send params to route api

// confirm valid on client

// 


class ResetPassword extends React.Component {
	constructor(props) {
		super();
		this.state = {
			uid: '',
			token: '',
			msg: '',
			pwd: '',
			pwdRepeat: ''
		}
		source = axios.CancelToken.source();
		this.updatePwd = this.updatePwd.bind(this);
		this.handleMsg = this.handleMsg.bind(this);
		this.getParameterByName = this.getParameterByName.bind(this);
	}

	componentDidMount() {
		let uid = this.getParameterByName('uid');
		let token = this.getParameterByName('token');
		if (uid && token) this.setState({uid: uid, token: token});
	}

	getParameterByName(name, url = window.location.href) {
	    name = name.replace(/[\[\]]/g, '\\$&');
	    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
	        results = regex.exec(url);
	    if (!results) return null;
	    if (!results[2]) return '';
	    return decodeURIComponent(results[2].replace(/\+/g, ' '));
	}


	handleMsg(msg) {
		if (msg.length > 0) {
			return <div className='logMsg'>{msg}</div>;
		}
	}

	updatePwd() {
		const body = ({
			uid: this.state.uid, 
			token: this.state.token,
			pwd: this.state.pwd,
			pwdRepeat: this.state.pwdRepeat
		});

		axios.post('/api/mail/pwdresetupdate', body, {cancelToken: source.token})
			.then(res => {
				this.setState({msg: res.data});
			})
			.catch(error => {
				if (typeof error.res.data !== 'undefined') this.setState({msg: error.res.data});
			})
	}

	componentWillUnmount() {
		if (source) source.cancel();
	}

	render() {
		return (
			<div className="loginContainer">
				<div id="newPwdTitle">Password Reset</div>
				<div id='pwdreset-msg'>Please enter your new password</div>
				<input 
					type="password" 
					name="pwd" 
					placeholder="Password"
					value={this.state.pwd}
					onChange={(e) => this.setState({pwd: e.target.value})}
					/>
				<input 
					type="password" 
					name="pwd-repeat" 
					placeholder="Repeat password"
					value={this.state.pwdRepeat}
					onChange={(e) => this.setState({pwdRepeat: e.target.value})}
					/>
				<button type="submit" name="reset-password-submit" onClick={() => this.updatePwd()}>Submit</button>
				<div className='logMsg'>{this.state.msg}</div>
			</div>
		);
	}
}



export default ResetPassword;
