import React from 'react';
import { Link } from "react-router-dom";
import { mealTypes, dietOptions, cuisine } from '../../searchOptions';
import './submit-recipe.sass';
import axios from 'axios';

import DropMenu from '../../components/dropMenu';
import MultiSelectMenu from '../../components/multiSelectMenu';
import Ingredients from '../../components/ingredients';
import Methods from '../../components/method';
import Notes from '../../components/notes';
import PhotoShow from './photoShow';



class submitRecipe extends React.Component {
	constructor(props) {
		super();
		this.state = {
			title: '',
			authid: '',
			description: '',
			mealType: '',
			diet: [],
			cuisine: [],	
			servings: '',			
			cookTime: '',
			ingredients: [{gtext: ' ', qty: ' ', unit: ' '}],
			method: [''],
			notes: [{text: '', stepNum: ''}],
			edit: false,
			selectedFile: null,
			fileName: null,
			profileImg: '',
			error: null
		};

		this.fileRef = React.createRef();
		this.handleInput = this.handleInput.bind(this);
		this.removeField = this.removeField.bind(this);
		this.addField = this.addField.bind(this);
		this.fileHandler = this.fileHandler.bind(this);
		this.uploadRecipe = this.uploadRecipe.bind(this);
		this.editMode = this.editMode.bind(this);
	}

	// put file into state variable
	fileHandler(event) {
		if (this.fileRef.current.files[0]) {
	   		this.setState({
	   			fileName: this.fileRef.current.files[0].name,
				selectedFile: event.target.files[0]
			}, () => console.log(this.state.selectedFile))
	   	}
	}

	uploadRecipe() {


		// formData does not suport nested objects, only key/value pairs. 
		// So any nested data was turned into json strings. And then converted into objects on the server side

		var formData = new FormData();
   		formData.append('file', this.state.selectedFile);
   		formData.append('title', this.state.title);
   		formData.append('description', this.state.description);
   		formData.append('mealType', this.state.mealType);
   		formData.append('diet', JSON.stringify(this.state.diet));
   		formData.append('cuisine', JSON.stringify(this.state.cuisine));
   		formData.append('servings', this.state.servings);
   		formData.append('cookTime', parseInt(this.state.cookTime));
   		formData.append('ingredients', JSON.stringify(this.state.ingredients));
   		formData.append('method', JSON.stringify(this.state.method));
   		formData.append('notes', JSON.stringify(this.state.notes));



		// const data = new FormData();
		// formData.append('file', this.state.selectedFile);
		// formData.append('title', this.state.title);

		fetch('/api/recipes/upload', {
			method: 'POST',
			body: formData
		})
		.then(res => res.json())
		.then(data => console.log(data))
		.catch(err => console.log(err));
	

  //  		console.log(this.state);
		// const postOptions = {
	 //        method: 'POST',
	 //        body: data
	 //    };


	  //   axios.post("/recipes/upload", data, { })
			// .then(res => { // then print response status
			// 	console.log(res.statusText)
			// })

		// axios({
		// 	method: 'post',
		// 	url: "/api/recipes/upload",
		// 	data: data
		// })
		// .then((data) => console.log(data))
		// .catch((error) => console.log(error));



		// fetch("/api/recipes/upload", postOptions)
		// 	.then(res => res.json())
		// 	.then(
		// 		(data) => {
		// 			console.log(data);
		// 		},
		// 		(error) => {
		// 			console.log('error');
		// 			this.setState({
		// 				error: error
		// 			})
		// 		}
		// 	)




	}



	addField(stateName) {
		var newState = this.state[stateName];
		stateName == 'ingredients' && newState.push( {gtext: '', qty: '', unit: ''} )
		stateName == 'method' && newState.push('')
		stateName == 'notes' && newState.push({text: '', stepNum: ''})
		this.setState({[stateName]: newState}, () => console.log(this.state[stateName]));
	}

	removeField(stateName) {
		console.log(stateName);
		var newState = this.state[stateName];
		if (newState.length > 1) {
			newState.pop();
			this.setState({[stateName]: newState});
		}
	}


	handleInput(fieldName, value, number = null) {
		// ingredients
		if (fieldName === 'qty' || fieldName === 'unit' || fieldName === 'gtext') {
			var newState = this.state.ingredients;
			newState[parseInt(number)][fieldName] = value;
			this.setState({ingredients: newState}, () => console.log(this.state.ingredients));	
			return null;
		}
		// method
		if (fieldName === 'method') {
			var newState = this.state.method;
			newState[number] = value;
			this.setState({method: newState}, () => console.log(this.state.method));	
			return null;
		}
		// notes
		if (fieldName === 'stepNum') {
			var newState = this.state.notes;
			newState[parseInt(number)][fieldName] = parseInt(value);
			this.setState({notes: newState}, () => console.log(this.state.notes));	
			return null;
		} else if (fieldName === 'note') {
			var newState = this.state.notes;
			newState[parseInt(number)][fieldName] = value;
			this.setState({notes: newState}, () => console.log(this.state.notes));	
			return null;
		}
		// title, description, servings, cookTime, mealType
		if (fieldName === 'title' || fieldName === 'description' || fieldName === 'servings' || fieldName === 'cookTime' || fieldName === 'mealType') {
			var newState = value;
		}
		// diet
		if (fieldName === 'diet') {
			var dietArr = this.state.diet;
			var ind = dietArr.indexOf(value);
			if (!dietArr.includes(value)) {
				dietArr.push(value);
				var newState = dietArr;
			} else {
				dietArr.splice(ind, 1);
				var newState = dietArr;
			}
		}
		// cuisine
		if (fieldName === 'cuisine') {
			var cuisineArr = this.state.cuisine;
			var ind = cuisineArr.indexOf(value);
			if (!cuisineArr.includes(value)) {
				cuisineArr.push(value);
				var newState = cuisineArr;
			} else {
				cuisineArr.splice(ind, 1);
				var newState = cuisineArr;
			}
		}
		//update state
		this.setState({
			[fieldName]: newState
		}, () => console.log(this.state[fieldName]));
	}

	editMode() {
		// read url/Link for edit paramaters. (recipeId)...  achieved parent component

		// fetch recipe data from server

		// update state with data

		// modify render. (Submit button changes, title changes, recipe photo is displayed)

		// create now route end point to handle update on server
	}

	componentDidMount() {
		//console.log(encodeURIComponent(this.props.title));
		if (this.props.editTitle.length > 0) {
			const url = '/api/recipes/get-edit/' + encodeURIComponent(this.props.editTitle);

			fetch(url)
			.then(res => res.json())
			.then(data => {
				console.log(data);
				this.setState({
					title: data.title,
					description: data.description,
					mealType: data.mealType,
					diet: data.diet,
					cuisine: data.cuisine,
					servings: data.servings,
					cookTime: data.cookTime.toString(),
					ingredients: data.ingredients,
					method: data.method,
					notes: data.notes, 
					profileImg: data.img
				})
			})
			.catch(err => console.log(err));
		}
	}

	render() {
		return (
			<div className="accountContent">
				<div id="submit-container">


{/*	            <button type='submit' name='deleteSubmit' id='deleteRecipe'>
		            	Delete Recipe
		            </button>

		           <div id='overlayDelete'></div>

		            <div id='DeleteForm'>
		               <p>Are you sure you want to delete INSERT RECIPE ? <br/> (this cannot be undone)</p>
		               <div>
		                  <form action='includes/deleteRecipe.php' method='POST'>
		                     <input type='hidden' name='rls' value='' autocomplete='off' />
		                     <button type='submit' name='confirmDelete'>Delete</button>
		                     <button type='button' id='back'>Back</button>
		                  </form>
		               </div>
		            </div>*/}

		            {
		            	this.props.edit
		            	? <div className='my-account-titles'>Edit Recipe</div>
		            	: <div className='my-account-titles'>Submit Recipe</div>		            	
		            }

		            <div id="req-note">
						<span className="requiredStar">*</span> 
						Required
					</div>

		          
{/*					<div className='subRec-field-container'>
						<label className='uploadPhoto'>
							Recipe Photo
							<span className='requiredStar'> *</span> 
						</label>
						<input className='fileUploadInput' type='file' name='file' />
						<img id='profileImg-Rec' style='display: none;' src='#' />
						<img className='phIcon' src={photoIcon} />
						<div id='image-holder'>
						</div>
					</div>
*/}



					<div className='subRec-field-container'>
						
						{/*<label className='std-field-label photo-mv'>Photo<span className='requiredStar'> *</span></label> */}
						<div id='img-pos'> 
							<PhotoShow 
								profileImg={this.state.profileImg} 
								imageType='recipe'
								ref={this.fileRef} 
								onChange={this.fileHandler}
								fileName={this.state.fileName}
								/> 
						</div>
						<label className='std-field-label pos-photo-title'>Photo<span className='requiredStar'> *</span> </label>
					
{/*
					{   this.state.profileImg ? 
						<PhotoShow profileImg={this.state.profileImg} imageType='recipe' /> : 
						null 
					}*/}
					
{/*						<label className='img-upload-btn'>
							<input className='fileUploadInput' ref={this.fileInput} onChange={this.fileHandler} type='file' name='file' />
							<img className='phIcon phIcon-submit' src={photoIcon} />
							<div className='uploadText-submit fileUpload'>
								{ this.state.fileName ? this.state.fileName : 'Upload .png or .jpg file type'  }
							</div> 
						</label>*/}
					</div>
		               


		          
					

					<div className="subRec-field-container title clearfix">
						<label className='std-field-label'>
							Title
							<span className="requiredStar"> *</span>
						</label>
						<input 
							id="titleInput" 
							type="text" 
							name="title" 
							maxLength="80" 
							value={this.state.title}
							onChange={(e) => this.handleInput(e.target.name, e.target.value)}
							/>
					</div>

					<div className="subRec-field-container description clearfix">
						<label className='std-field-label'>
							Description
							<span className="requiredStar"> *</span>
						</label>
						<textarea 
							name="description" 
							rows="4" 
							cols="54" 
							maxLength="500" 
							minLength="100" 
							// onkeyup="countChar(this)"
							value={this.state.description}
							onChange={(e) => this.handleInput(e.target.name, e.target.value)}
							>
						</textarea>
						<div id="charCount">
							100 to 500 characters (0)
						</div>
					</div>





					<div className="subRec-field-container servings">
						<label className='std-field-label'>
							Servings
							<span className="requiredStar"> *</span>
						</label>
						<input 
							className='pos-input'
							type="text" 
							name="servings"
							placeholder='example 1-9 persons or 24 Cookies' 
							maxLength="25" 
							value={this.state.servings}
							onChange={(e) => this.handleInput(e.target.name, e.target.value)}
							/>
					</div>


		            <div className="subRec-field-container time">
		               	<label className='std-field-label'>
		               		Cook & Preparation Time
		               		<span className="requiredStar"> *</span>
		               	</label>
		            	<input 
		            		className="pos-input cookTime-input" 
		            		type="text" 
		            		name="cookTime" 
		            		placeholder='minutes'
		            		maxLength="3" 
		            		value={this.state.cookTime}
							onChange={(e) => this.handleInput(e.target.name, e.target.value)}
		            		/>
		            </div>



					<div className="subRec-field-container">
						<div className="sub-subRec-field-container">

				 			<label className='subRec-title std-field-label'>
								Meal Type
								<span className="requiredStar"> *</span>
							</label>
							{ 
								mealTypes.map((mealType, index) => 
									<label key={index} className="check-container">
										{mealType}
										<input 
											name="mealType" 
											value={mealType} 
											type="checkbox"
											checked={this.state.mealType === mealType} 
											onChange={(e) => this.handleInput(e.target.name, e.target.value)}
											/>
										<span className="checkmark"></span>
									</label>
								)
							}
						</div>


						<div className="sub-subRec-field-container">
							<label className='subRec-title std-field-label'>
								Cuisine
							</label>
							<MultiSelectMenu 
								name='cuisine'
								options={cuisine}
								handleInput={(e) => this.handleInput(e.target.name, e.target.value)}
								state={this.state.cuisine}
								/>
						</div>


						<div className="sub-subRec-field-container">
							<label className='subRec-title std-field-label'>
								Dietary
							</label>
							<MultiSelectMenu 
								name='diet'
								options={dietOptions}
								handleInput={(e) => this.handleInput(e.target.name, e.target.value)}
								state={this.state.diet}
								/>

						</div>
					</div>



					<Ingredients 
						addField={this.addField} 
						ingredients={this.state.ingredients} 
						handleInput={this.handleInput} 
						removeField={this.removeField}
						/>



					<Methods
						addField={this.addField}
						removeField={this.removeField}
						handleInput={this.handleInput}
						methods={this.state.method}
						/>

					<Notes 
						addField={this.addField}
						removeField={this.removeField}
						handleInput={this.handleInput}
						notes={this.state.notes}
						/>





		   			{
		            	this.props.edit
		            	? <button className="submitr-btn" type="submit" name="submit_edit">Save Changes</button>
		            	: <React.Fragment>
		            		<button className="submitr-btn" type="submit" name="submit" onClick={this.uploadRecipe}>Submit Recipe</button>
		            		<div id="submit-note"><div>Once submitted, recipes are reviewed for grammar and clarity.<br/>Please be patient while recipies upload.</div></div>  
		            	  </React.Fragment> 

		            }

{/*		            {
		            	this.state.edit
		            	? null
		            	: <div id="submit-note"><div>Once submitted, recipes are reviewed for grammar and clarity.<br/>Please be patient while recipies upload.</div></div>            	
		            }*/}


				</div>
			</div>
		);
	}
}





export default submitRecipe;





