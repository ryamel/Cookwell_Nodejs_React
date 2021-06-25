import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './my-profile.sass';
import photoIcon from '../../media/icons/photo45.png';
import PhotoShow from './photoShow';
// const images = require.context('../../../public/user_profile_img', true);

class MyProfile extends Component {
	constructor() {
		super();
		this.state = {
			defaultEmail: '',
			defaultName: '',
			defaultAbout: '',
			profileImg: '',
			fileName: null,
			selectedFile: null
		}

		this.updateProfile = this.updateProfile.bind(this);
		this.fileHandler = this.fileHandler.bind(this);
		this.email = React.createRef();
		this.name = React.createRef();
		this.about = React.createRef();
		this.fileRef = React.createRef();
	}

	fileHandler(event) {
		if (this.fileRef.current.files[0]) {
	   		this.setState({
	   			fileName: this.fileRef.current.files[0].name,
				selectedFile: event.target.files[0]
			}, () => console.log(this.state.selectedFile))
	   	}
	}


	componentDidMount() {

		const defaultValues = {};
		var outside;

		fetch('/api/users/get-profile-data')
		.then(res => res.json())
		.then(data => {
			this.setState({
				defaultEmail: data.email,
				defaultName: data.name,
				defaultAbout: data.about,
				profileImg: data.profileImg
			}, () => console.log(this.state));
		})
		.catch(err => console.log(err));
		
	}


	updateProfile() {
		const formData = new FormData();
		formData.append('email', this.email.current.value);
		formData.append('name', this.name.current.value);
		formData.append('about', this.about.current.value);
		formData.append('file', this.state.selectedFile);


		fetch('/api/users/update-profile', {
			method: 'POST',
			body: formData
		})
		.then(res => res.json())
		.then(data => {
			if (typeof data.error !== "undefined") {
				console.log(data.error);
			} else {
				this.setState({
					defaultEmail: data.email,
					defaultName: data.name,
					defaultAbout: data.about,
					profileImg: data.profileImg
				}, () => console.log(this.state));
			}
		})
		.catch(err => console.log(err));
		
	}


	render() {
	
		return (
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
								profileImg={this.state.profileImg} 
								imageType='profile'
								ref={this.fileRef} 
								onChange={this.fileHandler}
								fileName={this.state.fileName}

								/> 
						</div>
					
					</div>



					<div className='fieldContainer clearfix'>
						<label className='std-field-label'>
							User name
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
							Description
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
		);	
	}
}





export default MyProfile;





