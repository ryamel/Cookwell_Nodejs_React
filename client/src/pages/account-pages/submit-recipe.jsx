import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './submit-recipe.sass';

class submitRecipe extends Component {
	constructor() {
		super();
		this.state = {
			title: [],
			description: '',
			cuisine: [],
			servings: '',
			mealType: '',
			dietary: [],
			cookTime: null
		};
	}


	handleInput(fieldName, value) {


		

		// update state
		this.setState({
			[fieldName]: value
		}, console.log(this.state));
	}



	render() {

		return (

			<div className="accountContent">
	  
				<div id="submit-container">

{/*		            <div className='std-form-heading'>
		            	EDIT RECIPE
		            </div>*/}

{/*		            <button type='submit' name='deleteSubmit' id='deleteRecipe'>
		            	Delete Recipe
		            </button>*/}

{/*		            <div id='overlayDelete'></div>

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
		          
{/*					<div className='subRec-field-container'>
						<img id='profileImg-Rec' style='display: none;' src='#' />
						<img className='phIcon' src='./Media/otherIcons/photo45.png' />
						<label className='std-field-label uploadPhoto'>Upload Recipe Photo<span className='requiredStar'> *</span> 
							<input className='fileUploadInput' type='file' name='file' />
						</label>
						<div id='image-holder'>
						</div>
					</div>*/}
		               
		            
					<div id="req-note">
						<span className="requiredStar">*</span> 
						Required
					</div>

					<div className="subRec-field-container">
						<label className="std-field-label">Title<span className="requiredStar"> *</span></label>
						<input 
							id="titleInput" 
							type="text" 
							name="title" 
							maxlength="80" 
							value={this.state.title}
							onChange={(e) => this.handleInput(e.target.name, e.target.value)}
						/>
					</div>

					<div className="subRec-field-container">
						<label className="std-field-label">Description<span className="requiredStar"> *</span></label>
						<textarea 
							name="description" 
							rows="4" 
							cols="54" 
							maxlength="500" 
							minlength="100" 
							onkeyup="countChar(this)"
							value={this.state.description}
							onChange={(e) => this.handleInput(e.target.name, e.target.value)}
						>
						</textarea>
						<div id="charCount">
							100 to 500 characters (0)
						</div>
					</div>

					<div className="subRec-field-container cusineList">
						<label className="std-field-label">Cuisine</label>
						<select 
							name="cuisine" 
							multiple="multiple" 
							className="3colactive"
							value={this.state.cuisine}
							onChange={(e) => this.handleInput(e.target.name, e.target.value)}
						>
							<option value='cuisineList' selected >cuisineList</option>
						</select>
					</div>

					<div className="subRec-field-container">
						<label className="std-field-label">
							Servings
							<span className="requiredStar"> *</span>
						</label>
						<input 
							type="text" 
							name="servings" 
							maxlength="25" 
							placeholder="Example: 1-9 persons or 24 Cookies" 
							value={this.state.servings}
							onChange={(e) => this.handleInput(e.target.name, e.target.value)}
						/>
					</div>

					<div className="subRec-field-container">
						<label className="std-field-label">
							Type
							<span className="requiredStar"> *</span>
						</label>
						<select 
							className="typeSelect" 
							type="text" 
							name="mealType" 
							onChange='typeChange()'
							value={this.state.mealType}
							onChange={(e) => this.handleInput(e.target.name, e.target.value)}
						>
							<option selected disabled ></option>
							<option value='' selected >mealType_displayNames </option>
						</select>
					</div>

		            <div className="subRec-field-container">
		               	<label className="std-field-label">
			            	Time (prep & cooking)
			            	<span className="requiredStar"> *</span>
		               	</label>
		            	<input 
		            		className="cookTime-input" 
		            		type="text" 
		            		name="cookTime" 
		            		maxlength="3" 
		            		value={this.state.time}
							onChange={(e) => this.handleInput(e.target.name, e.target.value)}
		            	/>
		            	<span className="cookingtime-text"> minutes </span>
		            </div>

{/*		            <div className="std-field-label">
		           		Dietary
		            	<span className="requiredStar"> *</span>
		            </div>

		            <div id="diet-select-container">
		                <label className='check-container'>diet_displayNames
		                	<input type='checkbox' name='diet[]' value='dietoptions' />
		                    <span className='checkmark'></span>
		                </label>
		            </div>*/}
	{/*
					<div id="dynamic_ingredients">
						<div className="std-field-label form-title-inline ingrMethNoteTitle">
							Ingredients
							<span className="requiredStar"> *</span>
						</div>
						<div id="addRemoveBtn-container">
							<button id="add_ingrField" type="button">Add Entry</button>
							<button id="remove_ingrField" type="button">Remove Last</button>
						</div>

		                <div className='field-container-add'>
		                	<input className='quantity' maxlength='10' type='text' name='qty[]' placeholder='Quantity' value='' />

		                    <select className='typeSelectUnit' onchange='unitChange()' type='text' name='unit[]'>
		                    	<option selected disabled >Unit</option>
		                        <option value='unitoptions' selected >unit </option>
		                    </select>
		                    <input className='ingr' maxlength='40' type='text' name='ingr[]' placeholder='Ingredient Name' value='' />
		  				</div>  
		            </div>*/}

	{/*
					<div id="dynamic_method">
						<div className="std-field-label form-title-inline ingrMethNoteTitle">
							Steps / Method
							<span className="requiredStar"> *</span>
						</div>
						<div id="addRemoveBtn-container">
							<button id="add_methodField" type="button">Add Entry</button>
							<button id="remove_methodField" type="button">Remove Last</button>
						</div>
						    <div className='field-container-add'>
						    	<textarea name='method[]' rows='4' cols='98' placeholder='Step ".$i."...'>method</textarea>
						    	<textarea name='method[]' rows='4' cols='98' placeholder='Step ".$i."...'></textarea>
						    </div>
						</div>
					</div>*/}


	{/*	            <div id='dynamic_notes'>
						<div className='std-field-label form-title-inline ingrMethNoteTitle'>
							Notes
						</div>
						<div id="addRemoveBtn-container">
							<button id="add_noteField" type="button" >Add Entry</button>
							<button id="remove_noteField" type="button">Remove Last</button>
						</div>
		                <div className='field-container-add'>
		                	<input className='noteNum' name='noteNum[]' placeholder='Step #' value='".$_SESSION['post-data']['noteNum'][$i]."'>
		                	<input className='noteInput' name='note[]' placeholder='Note to be attached to Step' value='".htmlentities($_SESSION['post-data']['note'][$i], ENT_QUOTES)."'>
		                </div>
						<div className='field-container-add'>
							<input className='noteNum' name='noteNum[]' placeholder='Step #'>
							<input className='noteInput' name='note[]' placeholder='Note to be attached to Step'>
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





