import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './change-password.sass';
import axios from 'axios';

class changePassword extends Component {
	constructor() {
		super();
		this.state = {
			oldPwd: '',
			newPwd: '',
			newPwdRepeat: '',
			msg:''
		}
		this.handleInput = this.handleInput.bind(this);
		this.changePassword = this.changePassword.bind(this);
		this.handleError = this.handleError.bind(this);
	}

	handleInput(e) {
		var fieldName = e.target.name;
		var newState = e.target.value;

		//update state
		this.setState({
			[fieldName]: newState
		}, () => console.log(this.state[fieldName]));

	}

	changePassword() {


		let data = {
			oldPwd: this.state.oldPwd,
			newPwd: this.state.newPwd,
			newPwdRepeat: this.state.newPwdRepeat
		}

		// const postOptions = {
		// 	method: 'POST',
		// 	headers: { 'Content-Type': 'application/json' }, // type of data being sent
		// 	body: JSON.stringify(data)
		// };


		// fetch('/api/users/change-password', postOptions)
		// .then(res => res.json())
		// .then(data => console.log(data))
		// .catch(err => console.log(err));

		axios.post('/api/users/change-password', JSON.stringify(data), { headers: {'Content-Type': 'application/json'} })
		 	.then(res => {
		 		if (typeof error.response.data !== 'undefined') this.setState({msg: error.response.data});
			})
			.catch(error => {
				if (typeof error.response.data !== 'undefined') this.setState({msg: error.response.data});
			});

	}

	handleError(msg) {
		if (msg.length > 0) {
			const timer = setTimeout(() => {
				this.setState({msg: ''});
			}, 5500);
			return <div className='bannerMsgBar'>{msg}</div>;
		}
	}


	render() {
		return (
			<React.Fragment>
				{ this.handleError(this.state.msg) }
				<div className="accountContent">
					<div id="editLogin">
						<div className='my-account-titles'>Change Password</div>
						<div id="pwdNotice">Password must be at least 8 characters, and can contain letters, numbers, or the symbols (!@#$%.?)</div>
							
						<label className='std-field-label'>Old Password</label>
						<input 
							type='password' 
							name='oldPwd'
							value={this.oldPwd}
							onChange={this.handleInput}
							/>
						<label className='std-field-label'>New Password</label>
						<input 
							type='password' 
							name='newPwd'
							value={this.newPwd}
							onChange={this.handleInput}
							/>
						<label className='std-field-label'>Confirm New Password</label>
						<input 
							type='password' 
							name='newPwdRepeat'
							value={this.newPwdRepeat}
							onChange={this.handleInput}
							/>

						<div>
							<button className='submitr-btn' type='submit' name='accountLogin' onClick={this.changePassword}>Update Account</button>
						</div>
					
					</div>
				</div>
			</React.Fragment>
		);
	}
}





export default changePassword;





