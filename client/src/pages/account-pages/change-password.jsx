import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './change-password.sass';
import axios from 'axios';
import Footer from '../../components/footer';
var source;
var timer;

class changePassword extends Component {
	constructor() {
		super();
		this.state = {
			oldPwd: '',
			newPwd: '',
			newPwdRepeat: '',
			msg:''
		}
		source = axios.CancelToken.source();
		this.handleInput = this.handleInput.bind(this);
		this.changePassword = this.changePassword.bind(this);
		this.handleError = this.handleError.bind(this);

		this.saveBtn = React.createRef();
		this.resetSaveBtn = this.resetSaveBtn.bind(this);
		this.btnSaving = this.btnSaving.bind(this);
	}

	handleInput(e) {
		var fieldName = e.target.name;
		var newState = e.target.value;

		//update state
		this.setState({
			[fieldName]: newState
		});
	}

	resetSaveBtn() {
		let btnHtml = 'Save';
		this.saveBtn.current.removeAttribute("disabled");
		document.querySelector(".submitr-btn").innerHTML = btnHtml;
	}

	btnSaving() {// disable submit button
		this.saveBtn.current.setAttribute("disabled", "disabled");
		document.querySelector(".submitr-btn").innerHTML = "Saving...";
	}

	changePassword() {
		this.btnSaving();

		let body = {
			oldPwd: this.state.oldPwd,
			newPwd: this.state.newPwd,
			newPwdRepeat: this.state.newPwdRepeat
		}

		axios.post('/api/users/changepassword', body, {cancelToken: source.token})
		 	.then(res => {
		 		this.setState({
		 			oldPwd: '',
					newPwd: '',
					newPwdRepeat: '',
		 			msg: res.data
		 		});
		 		this.resetSaveBtn();
			})
			.catch(error => {
				//console.log(error);
				this.setState({msg: error.response.data});
				this.resetSaveBtn();
			});

	}

	handleError(msg) {
		if (msg.length > 0) {
			timer = setTimeout(() => {
				this.setState({msg: ''});
			}, 5500);
			return <div className='bannerMsgBar'>{msg}</div>;
		}
	}

	componentWillUnmount() {
		if (source) source.cancel();
		if (timer) clearTimeout(timer);
	}


	render() {
		return (
			<React.Fragment>
				{	this.handleError(this.state.msg)	}
				<div className="accountContent minBodyHeight">
					<div id="editLogin">
						<div className='my-account-titles'>Change Password</div>
						<div id="changePwdNotice">
							Password must be at least 8 characters, and can contain letters, numbers, or the symbols (!@#$%.?)
						</div>
							
						<div className='inputDiv'>
							<label className='std-field-label'>Old Password</label>
							<input 
								type='password' 
								name='oldPwd'
								value={this.state.oldPwd}
								onChange={this.handleInput}
								/>
						</div>

						<div className='inputDiv'>
							<label className='std-field-label'>New Password</label>
							<input 
								type='password' 
								name='newPwd'
								value={this.state.newPwd}
								onChange={this.handleInput}
								/>
						</div>

						<div className='inputDiv'>
							<label className='std-field-label'>Confirm New Password</label>
							<input 
								type='password' 
								name='newPwdRepeat'
								value={this.state.newPwdRepeat}
								onChange={this.handleInput}
								/>
						</div>

						<div>
							<button className='submitr-btn' type='submit' name='accountLogin' ref={this.saveBtn} onClick={this.changePassword}>Save</button>
						</div>
					
					</div>
				</div>
			{/*	<Footer isLoaded={true} />*/}
			</React.Fragment>
		);
	}
}





export default changePassword;





