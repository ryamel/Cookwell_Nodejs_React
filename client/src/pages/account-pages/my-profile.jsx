import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './my-profile.sass';
import photoIcon from '../../media/icons/photo45.png';
import PhotoShow from './photoShow';
import axios from 'axios';


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
			}, () => console.log(this.state.selectedFile))
	   	}
	}


	componentDidMount() {

		axios.get('/api/users/get-profile-data')
		 	.then(res => {
		 		this.setState({
					defaultEmail: res.data.email,
					defaultName: res.data.name,
					defaultAbout: res.data.about,
					fileName: res.data.profileImg
				}, () => console.log(this.state));
			})
			.catch(error => {
				if (error.response.data !== 'undefined') this.setState({errMsg: error.response.data});
			});	
	}


	updateProfile() {
		const formData = new FormData();
		formData.append('email', this.email.current.value);
		formData.append('name', this.name.current.value);
		formData.append('about', this.about.current.value);
		formData.append('file', this.state.selectedFile);

		axios.post('/api/users/update-profile', formData)
		 	.then(res => {
		 		this.setState({
					defaultEmail: res.data.email,
					defaultName: res.data.name,
					defaultAbout: res.data.about,
					fileName: res.data.profileImg,
					errMsg: 'Profile Updated'
				}, () => console.log(this.state));
			})
			.catch(error => {
				if (typeof error.response.data !== 'undefined') this.setState({errMsg: error.response.data});
			});
		
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

				<div className="accountContent">
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
									imageType='profile'
									ref={this.fileRef} 
									file={this.state.file}
									fileName={this.state.fileName}
									fileObjURL={this.state.fileObjURL}
									onChange={this.fileHandler}
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

					</div>
				</div>
			</React.Fragment>
		);		
	}
}





export default MyProfile;





