import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './my-profile.sass';
// import photoIcon from '../../media/icons/photo45.png';
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
		formData.append('file', this.state.file);
		console.log(this.state.file);

		axios.post('/api/users/updateprofile', formData, {cancelToken: source.token})
		 	.then(res => {
		 		this.setState({
					defaultEmail: res.data.email,
					defaultName: res.data.name,
					defaultAbout: res.data.about,
					fileName: res.data.profileImg,
					errMsg: 'Profile Updated'
				});
			})
			.catch(error => {
				if (typeof error.response.data !== 'undefined') this.setState({errMsg: error.response.data});
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

	{/*					<div id="emailChangeNotice">
			            	 To change your email, respond to the verification link sent to the new email. Be sure to check your spam folder.
			            </div>*/}


			        	<label className='std-field-label ph-label'>
	            			Profile photo
	         			</label>
			        	{/*<PhotoShow profileImg={this.state.profileImg} imageType={'recipes'}/>*/}
			        		
						
			           	
					


	{/*					<div className='fieldContainer clearfix'>
							<label id='uploadInput-container'>
								<input className='fileUploadInput' ref={this.fileInput} onChange={this.fileHandler} type='file' name='file' />
								<img className='phIcon phIcon-profile'  src={photoIcon} />
								<div className='uploadText-profile fileUpload'>
									{ this.state.fileName ? this.state.fileName : 'Upload profile image ( .png or .jpg file type )'  }
								</div> 
							</label>
						</div>*/}

							
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

				

	{/*			            <div className="inlineContainer">
								<label className='std-field-label'>Twitter</label>
								<input 
									defaultValue='test'
									type='text' 
									name='tw' 
									defaultValue={this.state.defaultTw}
									ref={this.tw}
									/>
								<label className='std-field-label'>Instagram</label>
								<input 
									type='text' 
									name='insta' 
									defaultValue={this.state.defaultInsta}
									ref={this.insta}
									/>
								<label className='std-field-label'>YouTube</label>
								<input 
									type='text' 
									name='yt' 
									defaultValue={this.state.defaultYt}
									ref={this.yt}
									/>
								<label className='std-field-label'>Facebook</label>
								<input 
									type='text' 
									name='fb'
									defaultValue={this.state.defaultFb}
									ref={this.fb}
									/>
								<label className='std-field-label'>Website</label>
								<input 
									type='text' 
									name='web'
									defaultValue={this.state.defaultWeb}
									ref={this.web}
									/>
							</div>*/}


					
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





