import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './my-profile.sass';
import Footer from '../../components/footer';
import PhotoShow from '../../components/photoShow';
import axios from 'axios';
let source;

class MyProfile extends Component {
	constructor() {
		super();
		this.state = {
			defaultEmail: '',
			defaultName: '',
			defaultAbout: '',
			password: '',
			file: null,
			fileName: '',
			fileObjURL: '',
			errMsg: ''
		}
		source = axios.CancelToken.source();
		this.updateProfile = this.updateProfile.bind(this);
		this.fileHandler = this.fileHandler.bind(this);
		this.handleError = this.handleError.bind(this);
		this.email = React.createRef();
		this.name = React.createRef();
		this.about = React.createRef();
		this.fileRef = React.createRef();
	}

	fileHandler(event) {
		if (this.fileRef.current.files[0]) {
	   		this.setState({
				file: event.target.files[0],
				fileName: this.fileRef.current.files[0].name,
				fileObjURL: URL.createObjectURL(event.target.files[0])
			})
	   	}
	}


	componentDidMount() {
		axios.get('/api/users/getmyuserdata', {cancelToken: source.token})
		 	.then(res => {
		 		console.log(res.data);
		 		this.setState({
					defaultEmail: res.data.email,
					defaultName: res.data.name,
					defaultAbout: res.data.about,
					fileName: res.data.profileImg
				});
			})
			.catch(error => {
				//if (error.response.data !== 'undefined') this.setState({errMsg: error.response.data});
				console.log(error);
			});	
	}


	updateProfile() {
		const formData = new FormData();
		formData.append('email', this.email.current.value);
		formData.append('name', this.name.current.value);
		formData.append('about', this.about.current.value);
		formData.append('password', this.state.password);
		formData.append('file', this.state.file);


		axios.post('/api/users/updateprofile', formData, {cancelToken: source.token})
		 	.then(res => {
		 		this.setState({
					defaultEmail: res.data.email,
					defaultName: res.data.name,
					defaultAbout: res.data.about,
					fileName: res.data.profileImg,
					errMsg: 'Profile Updated',
					password: ''
				});
			})
			.catch(error => {
				if (typeof error.response.data !== 'undefined') this.setState({errMsg: error.response.data});
				this.setState({password: ''});
			});
		
	}

	componentWillUnmount() {
		if (source) source.cancel();
	}


	handleError(errMsg){
		if (errMsg.length > 0) {
			const timer = setTimeout(() => {
				this.setState({errMsg: ''});
			}, 5500);
			return <div className='bannerMsgBar'>{errMsg}</div>;
		}
	}


	render() {
		return (
			<React.Fragment>

				{ this.handleError(this.state.errMsg) }

				<div className="accountContent minBodyHeight">
					<div id="edit-container">

						<div className='my-account-titles'>
							Profile
						</div>


			        	<label className='std-field-label ph-label'>
	            			Profile photo
	         			</label>
			        		
							
						<div className='fieldContainer clearfix'>
							<div id='pos-img'>
								<PhotoShow 
									imageType='user'
									ref={this.fileRef} 
									onChange={this.fileHandler}
									file={this.state.file}
									fileName={this.state.fileName}
									fileObjURL={this.state.fileObjURL}
									/>
							</div>
						</div>



						<div className='fieldContainer clearfix'>
							<label className='std-field-label'>
								Username
							</label>
							<input 
								type='text' 
								name='name' 
								minLength="3" 
								maxLength='45'
								defaultValue={this.state.defaultName}
								ref={this.name}
								/>
						</div>


						<div className='fieldContainer clearfix'>
							<div className='std-field-label'>
					        	Email
					        </div>
				            <input 
				            	type='text' 
				            	name='email' 
				            	defaultValue={this.state.defaultEmail}
								ref={this.email}
				            	/>
			            </div>


						<div className='fieldContainer clearfix'>
							<label className='std-field-label'>
								About
							</label>
							<textarea 
								minLength='100' 
								maxLength='500' 
								name='about' 
								rows='7' 
								cols='50'
								defaultValue={this.state.defaultAbout}
								ref={this.about}
								>
							</textarea>	
						</div>


						<div id='pwdNotice'>
							Confirm your account password to update your profile information
						</div>
						<div className='fieldContainer clearfix'>
						
							<input 
								placeholder='Password'
				            	type='password' 
				            	name='pwd' 
								value={this.state.password}
								onChange={(e) => this.setState({password: e.target.value})}
				            	/>
						</div>
					

						<div>
							<button className='submitr-btn' type='submit' name='submit-accountUpdate' onClick={this.updateProfile} >
								Update Account
							</button>
						</div>

						{ this.state.defaultName == "" || this.state.fileName.length < 1 ?
							<div className='textStyle profileNote'>
								Completing your profile information makes it easier to discover your recipes. <br/> Without a <i>username</i> the author of your recipes will be 
								listed as 'Anonymous'.
							</div> : null
						}

					</div>
				</div>
			</React.Fragment>
		);		
	}
}





export default MyProfile;





