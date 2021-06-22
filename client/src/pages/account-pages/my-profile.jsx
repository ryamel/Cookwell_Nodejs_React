import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './my-profile.sass';
import photoIcon from '../../media/icons/photo45.png';
// const images = require.context('../../public/images', true);

class MyProfile extends Component {
	constructor() {
		super();
		this.state = {
			defaultEmail: '',
			defaultName: '',
			defaultAbout: '',
			defaultTw: '',
			defaultInsta: '',
			defaultYt: '',
			defaultFb: '',
			defaultWeb: '',
			fileName: null,
			selectedFile: null
		}

		this.updateProfile = this.updateProfile.bind(this);
		this.fileHandler = this.fileHandler.bind(this);
		this.email = React.createRef();
		this.name = React.createRef();
		this.about = React.createRef();
		this.tw = React.createRef();
		this.insta = React.createRef();
		this.yt = React.createRef();
		this.fb = React.createRef();
		this.web = React.createRef();
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
				defaultTw: data.socialLinks.tw,
				defaultInsta: data.socialLinks.insta,
				defaultYt: data.socialLinks.yt,
				defaultFb: data.socialLinks.fb,
				defaultWeb: data.socialLinks.web
			});
		})
		.catch(err => console.log(err));

		
	}


	updateProfile() {

		const data = new FormData();
		data.append('email', this.email.current.value);
		data.append('name', this.name.current.value);
		data.append('about', this.about.current.value);
		data.append('tw', this.tw.current.value);
		data.append('insta', this.insta.current.value);
		data.append('yt', this.yt.current.value);
		data.append('fb', this.fb.current.value);
		data.append('web', this.web.current.value);
		data.append('file', this.state.selectedFile);



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
			body: data
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
					defaultTw: data.tw,
					defaultInsta: data.insta,
					defaultYt: data.yt,
					defaultFb: data.fb,
					defaultWeb: data.web
				}, () => console.log(this.state));
			}
		})
		.catch(err => console.log(err));
		
	}

 // This image will be next to your recipes. It's an easy way for people to recognize your work. It can be artwork, a logo, or just a photo of you and your dog.
	render() {
	
		return (
			<div className="accountContent">
				<div id="edit-container">

					<div className='my-account-titles'>Profile</div>

{/*					<div id="emailChangeNotice">
		            	 To change your email, respond to the verification link sent to the new email. Be sure to check your spam folder.
		            </div>*/}

		            
            	
						{/*<img id="profileImg-Profile" onError="this.style.display='none'" src= />*/}


						<div>

							<label id='uploadInput-container'>
								<input className='fileUploadInput' ref={this.fileInput} onChange={this.fileHandler} type='file' name='file' />
								<img className='phIcon phIcon-profile'  src={photoIcon} />
								<div className='uploadText-profile fileUpload'>
									{ this.state.fileName ? this.state.fileName : 'Upload Profile Image ( .png or .jpg file type )'  }
								</div> 
							</label>

							<div className='std-field-label'>
					        	Email
					        </div>
				            <input 
				            	id="emailInput" 
				            	type='text' 
				            	name='email' 
				            	defaultValue={this.state.defaultEmail}
								ref={this.email}
				            	/>

						</div>
				






		            

					<div id="flexContainer">

						<div className="inlineContainer">
							<label className='std-field-label shortenField'>
								Display Name
							</label>
							<input 
								type='text' 
								name='name' 
								minLength="3" 
								maxLength='45'
								defaultValue={this.state.defaultName}
								ref={this.name}
								/>
							<label className='std-field-label'>
								About
							</label>
							<textarea 
								minLength='100' 
								maxLength='500' 
								name='about' 
								rows='7' 
								cols='100'
								defaultValue={this.state.defaultAbout}
								ref={this.about}
								>
							</textarea>	
				        </div>

			            <div className="inlineContainer">
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
						</div>

					</div>	
				
					<div>
						<button className='submitr-btn' type='submit' name='submit-accountUpdate' onClick={this.updateProfile} >Update Account</button>
					</div>
				</div>
			</div>
		);	
		
		
	}
}





export default MyProfile;





