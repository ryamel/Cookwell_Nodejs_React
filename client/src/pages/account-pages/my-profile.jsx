import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './my-profile.sass';
import photoIcon from '../../media/icons/photo45.png';
const images = require.context('../../../public/user_profile_img', true);

class MyProfile extends Component {
	constructor() {
		super();
		this.state = {
			defaultEmail: '',
			defaultName: '',
			defaultAbout: '',
			profileImg: '',
			// defaultInsta: '',
			// defaultYt: '',
			// defaultFb: '',
			// defaultWeb: '',
			fileName: null,
			selectedFile: null
		}

		this.updateProfile = this.updateProfile.bind(this);
		this.fileHandler = this.fileHandler.bind(this);
		this.email = React.createRef();
		this.name = React.createRef();
		this.about = React.createRef();
		// this.tw = React.createRef();
		// this.insta = React.createRef();
		// this.yt = React.createRef();
		// this.fb = React.createRef();
		// this.web = React.createRef();
		this.fileInput = React.createRef();
	}

	fileHandler(event) {
		if (this.fileInput.current.files[0]) {
	   		this.setState({
	   			fileName: this.fileInput.current.files[0].name,
				selectedFile: event.target.files[0]
			}, () => console.log(this.state.selectedFile))
	   	}
	}


	componentDidMount() {

		const defaultValues = {};

		fetch('/api/users/get-profile')
		.then(res => res.json())
		.then(data => {
			this.setState({
				defaultEmail: data.email,
				defaultName: data.name,
				defaultAbout: data.about,
				profileImg: data.profileImg
				// defaultTw: data.socialLinks.tw,
				// defaultInsta: data.socialLinks.insta,
				// defaultYt: data.socialLinks.yt,
				// defaultFb: data.socialLinks.fb,
				// defaultWeb: data.socialLinks.web
			},console.log(this.state));
		})
		.catch(err => console.log(err));

		
	}




	updateProfile() {
		const formData = new FormData();
		formData.append('email', this.email.current.value);
		formData.append('name', this.name.current.value);
		formData.append('about', this.about.current.value);
		// formData.append('tw', this.tw.current.value);
		// formData.append('insta', this.insta.current.value);
		// formData.append('yt', this.yt.current.value);
		// formData.append('fb', this.fb.current.value);
		// formData.append('web', this.web.current.value);
		// formData.append('file', this.state.selectedFile);



		// const data = {
		// 	email: this.email.current.value,
		// 	name: this.name.current.value,
		// 	about: this.about.current.value,
		// 	socialLinks: {
		// 		tw: this.tw.current.value,
		// 		insta: this.insta.current.value,
		// 		yt: this.yt.current.value,
		// 		fb: this.fb.current.value,
		// 		web: this.web.current.value
		// 	}
		// }



		fetch('/api/users/update-profile', {
			method: 'POST',
			body: formData
		})
		.then(res => res.json())
		.then(data => {
			if (typeof data.error !== "undefined") {
				console.log(data.error);
			} else {
				//console.log(data);
				this.setState({
					defaultEmail: data.email,
					defaultName: data.name,
					defaultAbout: data.about
					// defaultTw: data.socialLinks.tw,
					// defaultInsta: data.socialLinks.insta,
					// defaultYt: data.socialLinks.yt,
					// defaultFb: data.socialLinks.fb,
					// defaultWeb: data.socialLinks.web
				}, () => console.log(this.state));
			}
		})
		.catch(err => console.log(err));
		
	}

 // This image will be next to your recipes. It's an easy way for people to recognize your work. It can be artwork, a logo, or just a photo of you and your dog.
	render() {

		//const { profileImg } = this.state;
		// const profileImg = this.state.profileImg;
		// console.log(profileImg);

//onError="this.style.display='none'"

	
	
		return (
			<div className="accountContent">
				<div id="edit-container">

					<div className='my-account-titles'>
						Profile
					</div>

{/*					<div id="emailChangeNotice">
		            	 To change your email, respond to the verification link sent to the new email. Be sure to check your spam folder.
		            </div>*/}

		            <div id='photo-container' className='clearfix'>
		            	<label className='std-field-label ph-label'>
							User photo
						</label>
		            {
		           		this.state.profileImg.length > 0 ? 
		           		<img id='img-show' src={images(`./${this.state.profileImg}`).default} /> : 
		           		<div id='photo-msg'>
		           			An image on your profile identifies you as a contributor. 
		           			And for other people to recognize your awesome recipes! 
		           			It can be artwork, a logo, or just of you.
		           		</div>
		           	}
		           	</div>
            		

				

				
					<div className='fieldContainer clearfix'>
						<label id='uploadInput-container'>
							<input className='fileUploadInput' ref={this.fileInput} onChange={this.fileHandler} type='file' name='file' />
							<img className='phIcon phIcon-profile'  src={photoIcon} />
							<div className='uploadText-profile fileUpload'>
								{ this.state.fileName ? this.state.fileName : 'Upload profile image ( .png or .jpg file type )'  }
							</div> 
						</label>
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





