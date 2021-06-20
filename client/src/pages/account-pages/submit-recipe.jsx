import React from 'react';
import { Link } from "react-router-dom";
import { mealTypes, dietOptions, cuisine } from '../../searchOptions';
import './submit-recipe.sass';
import axios from 'axios';

import photoIcon from '../../media/icons/photo45.png';
import DropMenu from '../../components/dropMenu';
import MultiSelectMenu from '../../components/multiSelectMenu';
import Ingredients from '../../components/ingredients';
import Methods from '../../components/method';
import Notes from '../../components/notes';

class submitRecipe extends React.Component {
	constructor() {
		super();
		this.state = {
			title: '',
			authid: '60ac3fd7520326cbcf375237',
			description: '',
			mealType: '',
			diet: [],
			cuisine: [],	
			servings: '',			
			cookTime: null,
			ingredients: [{gtext: ' ', qty: ' ', unit: ' '}],
			method: [''],
			notes: [{note: '', stepNum: ''}],
			edit: false,
			selectedFile: null,
			fileName: null,
			error: null,
		};

		this.fileInput = React.createRef();
		this.handleInput = this.handleInput.bind(this);
		this.removeField = this.removeField.bind(this);
		this.addField = this.addField.bind(this);
		this.fileHandler = this.fileHandler.bind(this);
		this.uploadRecipe = this.uploadRecipe.bind(this);
	}

	// put file into state variable
	fileHandler(e) {
		if (this.fileInput.current.files[0]) {
	   		this.setState({
	   			fileName: this.fileInput.current.files[0].name,
				selectedFile: event.target.files[0]
			}, () => console.log(this.state.selectedFile))
	   	}
	}

	uploadRecipe() {


		// formData does not suport nested objects, only key/value pairs. 
		// So any nested data was turned into json strings. And then converted into objects on the server side

		var data = new FormData();
   		data.append('file', this.state.selectedFile);
   		// data.append('title', this.state.title);
   		// data.append('authid', this.state.authid);
   		// data.append('description', this.state.description);
   		// data.append('mealType', this.state.mealType);
   		// data.append('diet', JSON.stringify(this.state.diet));
   		// data.append('cuisine', JSON.stringify(this.state.cuisine));
   		// data.append('servings', this.state.servings);
   		// data.append('cookTime', this.state.cookTime);
   		// data.append('ingredients', JSON.stringify(this.state.ingredients));
   		// data.append('method', JSON.stringify(this.state.method));
   		// data.append('notes', JSON.stringify(this.state.notes));



		// const data = new FormData();
		// data.append('file', this.state.selectedFile);
		// data.append('title', this.state.title);

		fetch('/api/recipes/upload', {
			method: 'POST',
			headers: { 'Content-Type': 'multipart/form-data' },
			body: data,
		})
		.then(res => res.json())
		.then(body => console.log(body))
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
		stateName == 'notes' && newState.push({note: '', stepNum: ''})
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
		            	this.state.edit
		            	? <div className='submit-form-heading'>EDIT RECIPE</div>
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
						<label>
							Photo
							<span className='requiredStar'> *</span> 
						</label>
						<label style={{cursor: 'pointer'}}>
							<input className='fileUploadInput' ref={this.fileInput} onChange={this.fileHandler} type='file' name='file' />
							<img className='phIcon' src={photoIcon} />
							<div id='fileUploadName'>
								{ this.state.fileName ? this.state.fileName : 'Upload .png or .jpg file type'  }
							</div> 
						</label>
					</div>
		               


		          
					

					<div className="subRec-field-container title clearfix">
						<label>
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
						<label>
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
						<label>
							Servings
							<span className="requiredStar"> *</span>
						</label>
						<input 
							type="text" 
							name="servings"
							placeholder='example 1-9 persons or 24 Cookies' 
							maxLength="25" 
							value={this.state.servings}
							onChange={(e) => this.handleInput(e.target.name, e.target.value)}
							/>
					</div>


		            <div className="subRec-field-container time">
		               	<label>
		               		Cook & Preparation Time
		               		<span className="requiredStar"> *</span>
		               	</label>
		            	<input 
		            		className="cookTime-input" 
		            		type="text" 
		            		name="cookTime" 
		            		placeholder='minutes'
		            		maxLength="3" 
		            		value={this.state.time}
							onChange={(e) => this.handleInput(e.target.name, e.target.value)}
		            		/>
		            </div>



					<div className="subRec-field-container">
						<div className="sub-subRec-field-container">

				 			<label className='subRec-title'>
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
							<label className='subRec-title'>
								Cuisine
							</label>
							<MultiSelectMenu 
								name='cuisine'
								options={cuisine}
								handleInput={(e) => this.handleInput(e.target.name, e.target.value)}
								/>
						</div>


						<div className="sub-subRec-field-container">
							<label className='subRec-title'>
								Dietary
							</label>
							<MultiSelectMenu 
								name='diet'
								options={dietOptions}
								handleInput={(e) => this.handleInput(e.target.name, e.target.value)}
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





		           {/* <button className="submitr-btn" type="submit" name="submit_edit">Save Changes</button>*/}

		            <button className="submitr-btn" type="submit" name="submit" onClick={this.uploadRecipe}>Submit Recipe</button>



					<div id="submit-note">
						<div>Once submitted, recipes are reviewed for grammar and clarity.<br/>Please be patient while recipies upload.</div>
					</div>

				</div>
			</div>
		);
	}
}





export default submitRecipe;





