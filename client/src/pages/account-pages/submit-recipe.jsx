import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './submit-recipe.sass';
import DropMenu from '../../components/dropMenu';
import MultiSelectMenu from '../../components/multiSelectMenu';
import { mealTypes, dietOptions, cuisine } from '../../searchOptions';
import photoIcon from '../../media/icons/photo45.png';
import Ingredients from '../../components/ingredients';


class submitRecipe extends Component {
	constructor() {
		super();
		this.state = {
			title: [],
			description: '',
			cuisine: [],
			servings: '',
			mealType: '',
			diet: [],
			cookTime: null,
			edit: false,
			ingredients: [{text: '', qty: '', unit: ''}]
		};

		this.handleInput = this.handleInput.bind(this);
		this.addIngrField = this.addIngrField.bind(this);
		this.removeIngrField = this.removeIngrField.bind(this);
	}


	addIngrField() {
		var newState = this.state.ingredients;
		newState.push( {text: '', qty: '', unit: ''} );
		this.setState({ingredients: newState}, () => console.log(this.state.ingredients));
	}

	removeIngrField() {
		var newState = this.state.ingredients;
		if (newState.length > 1) {
			newState.pop();
			this.setState({ingredients: newState}, () => console.log(this.state.ingredients));
		}
	}





	handleInput(fieldName, value, number = null) {
		// console.log(fieldName);
		// console.log(value);
		// console.log(number);

			// description

			// title

			// photo??

			// servings

		if (fieldName == 'diet') {
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

		if (fieldName == 'mealType') {
			var newState = value;
		}

		if (fieldName == 'cuisine') {
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

		if (number) {
			var newState = this.state.ingredients;
			newState[parseInt(number)][fieldName] = value;
			this.setState({ingredients: newState}, () => console.log(this.state.ingredients));	
			return null;
		}


		// update state
		this.setState({
			[fieldName]: newState
		}, () => console.log(this.state.cuisine));
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
		            	: <div className='submit-form-heading'>SUBMIT RECIPE</div>		            	
		            }

		          
					<div className='subRec-field-container'>
						<label className='uploadPhoto'>
							Recipe Photo
							<span className='requiredStar'> *</span> 
						</label>
						{/*<input className='fileUploadInput' type='file' name='file' />*/}
						{/*<img id='profileImg-Rec' style='display: none;' src='#' />*/}
						{/*<img className='phIcon' src={photoIcon} />*/}
						<div id='image-holder'>
						</div>
					</div>
		               
		            
					<div id="req-note">
						<span className="requiredStar">*</span> 
						Required
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
{/*						<div id="charCount">
							100 to 500 characters (0)
						</div>*/}
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
						addIngrField={this.addIngrField} 
						ingredients={this.state.ingredients} 
						handleInput={this.handleInput} 
						removeIngrField={this.removeIngrField}
					/>


{/*					<div id="dynamic_ingredients">

						<div className="std-field-label form-title-inline ingrMethNoteTitle">
							Ingredients
							<span className="requiredStar"> *</span>
						</div>

						<div id="addRemoveBtn-container">
							<button id="add_ingrField" onClick={this.addIngrField} type="button">Add Entry</button>
							<button id="remove_ingrField" onClick={this.removeIngrField} type="button">Remove Last</button>
						</div>
	
						<AddIngredientFields ingredients={this.state.ingredients} handleInput={this.handleInput}/>

					</div>
*/}
	
{/*					<div id="dynamic_method">
						<div className="std-field-label form-title-inline ingrMethNoteTitle">
							Steps / Method
							<span className="requiredStar"> *</span>
						</div>
						<div id="addRemoveBtn-container">
							<button id="add_methodField" type="button">Add Entry</button>
							<button id="remove_methodField" type="button">Remove Last</button>
						</div>
					    <div className='field-container-add'>
					    	<textarea 
						    	name='method' 
						    	rows='4' 
						    	cols='98' 
						    	placeholder='Step ".$i."...'
					    	>	
					    	</textarea>
					    </div>
					</div>


		            <div id='dynamic_notes'>
						<div className='std-field-label form-title-inline ingrMethNoteTitle'>
							Notes
						</div>
						<div id="addRemoveBtn-container">
							<button id="add_noteField" type="button" >Add Entry</button>
							<button id="remove_noteField" type="button">Remove Last</button>
						</div>
		                <div className='field-container-add'>
		                	<input 
		                		className='noteNum' 
		                		name='noteNum[]' 
		                		placeholder='Step #' 
		                		value=''
		                	/>
		                	<input 
		                		className='noteInput' 
		                		name='note[]' 
		                		placeholder='Note to be attached to Step' 
		                		value=''
		                	/>
		                </div>
		            </div>*/}




	{/*	            <button className="submitr-btn" type="submit" name="submit_edit" formaction="includes\uploadRecipeEdit?rls='.encrypt_decrypt('encrypt', $rID).'">Save Changes</button>
		            <button className="submitr-btn" type="submit" name="submit" formaction="includes\uploadRecipe">Submit Recipe</button>
					<div id="submit-note">
						<div>Once submitted, recipes are reviewed for grammar and clarity.<br>Please be patient while recipies upload.</div>
					</div>*/}

				</div>
			</div>
		);
	}
}





export default submitRecipe;





