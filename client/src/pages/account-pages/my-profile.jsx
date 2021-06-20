import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './my-profile.sass';

class MyProfile extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			displayName: '',
			about: '',
			tw: '',
			insta: '',
			yt: '',
			fb: '',
			web: '',
			fileName: null
		}

		this.handleInput = this.handleInput.bind(this);
		this.handleFileInput = this.handleFileInput.bind(this);
	}

	handleInput(e) {
		var fieldName = e.target.name;
		var newState = e.target.value;

		// if (fileName == 'email') {}
		// if (fileName == 'displayName') {}
		// if (fileName == 'about') {}
		// if (fileName == 'tw') {}
		// if (fileName == 'insta') {}
		// if (fileName == 'yt') {}
		// if (fileName == 'fb') {}
		// if (fileName == 'web') {}



		//update state
		this.setState({
			[fieldName]: newState
		}, () => console.log(this.state[fieldName]));
	}

	handleFileInput(e) {}


	render() {

		return (
			<div className="accountContent">
				<div id="edit-container">

					<div className='my-account-titles'>Account</div>

{/*					<div id="emailChangeNotice">
		            	 To change your email, respond to the verification link sent to the new email. Be sure to check your spam folder.
		            </div>*/}

					{/*<img id="profileImg-Profile" onError="this.style.display='none'" src='' />*/}
{/*					<img className='phIcon' src='./Media/otherIcons/photo45.png' />

					<label className='uploadPhoto'>
						Upload Account Photo
						<span id="infotext">
							This image will be next to your recipes. It's an easy way for people to recognize your work. It can be artwork, a logo, or just a photo of you and your dog.
						</span>
			        	<input 
			        		className='fileUploadInput' 
			        		type='file' 
			        		name='file' 
			        		/>
			        </label>
*/}


			        <div className='std-field-label'>Email</div>
		            <input 
		            	id="emailInput" 
		            	type='text' 
		            	name='email' 
		            	value={this.email}
						onChange={this.handleInput}
		            	/>

		            

					<div id="flexContainer">

						<div className="inlineContainer">
							<label className='std-field-label shortenField'>Display Name</label>
							<input 
								type='text' 
								name='displayName' 
								minLength="3" 
								maxLength='45'
								value={this.displayName}
								onChange={this.handleInput}
								/>
							<label className='std-field-label'>About</label>
							<textarea 
								minLength='100' 
								maxLength='500' 
								name='about' 
								rows='7' 
								cols='100'
								value={this.about}
								onChange={this.handleInput}
								>
							</textarea>	
				        </div>

			            <div className="inlineContainer">
							<label className='std-field-label'>Twitter</label>
							<input 
								type='text' 
								name='tw' 
								value={this.tw}
								onChange={this.handleInput}
								/>
							<label className='std-field-label'>Instagram</label>
							<input 
								type='text' 
								name='insta' 
								value={this.insta}
								onChange={this.handleInput}
								/>
							<label className='std-field-label'>YouTube</label>
							<input 
								type='text' 
								name='yt' 
								value={this.yt}
								onChange={this.handleInput}
								/>
							<label className='std-field-label'>Facebook</label>
							<input 
								type='text' 
								name='fb'
								value={this.fb}
								onChange={this.handleInput}
								/>
							<label className='std-field-label'>Website</label>
							<input 
								type='text' 
								name='web'
								value={this.web}
								onChange={this.handleInput}
								/>
						</div>

					</div>	
				
					<div>
						<button className='submitr-btn' type='submit' name='submit-accountUpdate'>Update Account</button>
					</div>

				</div>
			</div>
		);	
	}
}





export default MyProfile;





