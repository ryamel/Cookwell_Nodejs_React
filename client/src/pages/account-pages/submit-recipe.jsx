import React from 'react';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router'
import { mealTypes, dietOptions, cuisine } from '../../searchOptions';
import './submit-recipe.sass';
import axios from 'axios';
import { getURLparam } from '../../functions';

import DropMenu from '../../components/dropMenu';
import MultiSelectMenu from '../../components/multiSelectMenu';
import Ingredients from '../../components/ingredients';
import Methods from '../../components/method';
import Notes from '../../components/notes';
import PhotoShow from '../../components/photoShow';
import DeleteRecipe from '../../components/deleteRecipe';
import Footer from '../../components/footer';
let source;
let timer;



class submitRecipe extends React.Component {
	constructor(props) {
		super();
		this.state = {
			rid: '',
			title: '',
			description: '',
			mealType: '',
			diet: [],
			cuisine: [],	
			servings: '',			
			cookTime: '',
			ingredients: [{gtext: '', qty: '', unit: ''}],
			method: [''],
			notes: [''],
			file: null,
			fileName: '',
			fileObjURL: '',
			error: null,
			errMsg: '',
			redirect: false
		};
		source = axios.CancelToken.source();
		this.saveBtn = React.createRef();
		this.editBtn = React.createRef();
		this.fileRef = React.createRef();
		this.handleInput = this.handleInput.bind(this);
		this.removeField = this.removeField.bind(this);
		this.addField = this.addField.bind(this);
		this.fileHandler = this.fileHandler.bind(this);
		this.uploadRecipe = this.uploadRecipe.bind(this);
		this.saveEdit = this.saveEdit.bind(this);
		this.handleError = this.handleError.bind(this);
		this.redirect = this.redirect.bind(this);
		this.renderSaveBtn = this.renderSaveBtn.bind(this);
		this.resetSaveBtn = this.resetSaveBtn.bind(this);
		this.btnSaving = this.btnSaving.bind(this);
	}

	redirect() {
		this.setState({redirect: true});
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

	addField(stateName) {
		var newState = this.state[stateName];
		stateName == 'ingredients' && newState.push( {gtext: '', qty: '', unit: ''} );
		stateName == 'method' && newState.push('');
		stateName == 'notes' && newState.push('');
		this.setState({[stateName]: newState});
	}

	removeField(stateName) {
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
			this.setState({ingredients: newState});	
			return null;
		}
		// method
		if (fieldName === 'method') {
			var newState = this.state.method;
			newState[number] = value;
			this.setState({method: newState});	
			return null;
		}
		// notes
		if (fieldName === 'text') {
			var newState = this.state.notes;
			newState[number] = value;
			this.setState({notes: newState});	
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
		});
	}

	componentDidMount() {
		let editId = getURLparam('editId');
		if (editId) {
			axios.get('/api/recipes/getedit/' + encodeURIComponent(editId), {cancelToken: source.token})			
				.then(res => {
					this.setState({
						rid: res.data._id,
						title: res.data.title,
						description: res.data.description,
						mealType: res.data.mealType,
						diet: res.data.diet,
						cuisine: res.data.cuisine,
						servings: res.data.servings,
						cookTime: res.data.cookTime,
						ingredients: res.data.ingredients,
						method: res.data.method,
						notes: res.data.notes, 
						fileName: res.data.img
					})
				})
			.catch(err => {
				//console.log(err)
			});

		}
	}

	resetSaveBtn() {
		let btnHtml;
		this.props.edit == true ? btnHtml = 'Save Changes' : btnHtml = 'Submit Recipe';
		this.saveBtn.current.removeAttribute("disabled");
		document.querySelector(".submitr-btn").innerHTML = btnHtml;
	}

	btnSaving() {// disable submit button
		this.saveBtn.current.setAttribute("disabled", "disabled");
		document.querySelector(".submitr-btn").innerHTML = "Saving...";
	}

	uploadRecipe() {
		this.btnSaving();
		// formData does not suport nested objects, only key/value pairs. So any nested data was turned into json strings. And then converted into objects on the server side
		var formData = new FormData();
   		formData.append('file', this.state.file);
   		formData.append('title', this.state.title);
   		formData.append('description', this.state.description);
   		formData.append('mealType', this.state.mealType);
   		formData.append('diet', JSON.stringify(this.state.diet));
   		formData.append('cuisine', JSON.stringify(this.state.cuisine));
   		formData.append('servings', this.state.servings);
   		formData.append('cookTime', this.state.cookTime);
   		formData.append('ingredients', JSON.stringify(this.state.ingredients));
   		formData.append('method', JSON.stringify(this.state.method));
   		formData.append('notes', JSON.stringify(this.state.notes));

		axios.post('/api/recipes/upload', formData, {cancelToken: source.token})
		 	.then(response => {
		 		this.setState({redirect: true}) // redirect back to my-account page and display success msg on page})
		 		this.resetSaveBtn();
			})
			.catch(error => {
				//console.log(error);
				if (error.response.data.length > 100) {
					this.setState({
						error: true,
						errMsg: "Server Error"
					});
				} else {
					this.setState({
						error: true,
						errMsg: error.response.data
					});
				}
				this.resetSaveBtn();
			});
	}


	saveEdit() {
		this.btnSaving();

		var fdata = new FormData();
		fdata.append('file', this.state.file);
   		fdata.append('title', this.state.title);
   		fdata.append('rid', this.state.rid);
   		fdata.append('description', this.state.description);
   		fdata.append('mealType', this.state.mealType);
   		fdata.append('diet', JSON.stringify(this.state.diet));
   		fdata.append('cuisine', JSON.stringify(this.state.cuisine));
   		fdata.append('servings', this.state.servings);
   		fdata.append('cookTime', this.state.cookTime);
   		fdata.append('ingredients', JSON.stringify(this.state.ingredients));
   		fdata.append('method', JSON.stringify(this.state.method));
   		fdata.append('notes', JSON.stringify(this.state.notes));


   		axios.post('/api/recipes/saveEdit', fdata, {cancelToken: source.token}, { headers: {'Content-Type': 'application/json'} } )
		 	.then(res => {
				this.setState({
					redirect: true // redirect back to my-account page and display success msg on page
				})
				this.resetSaveBtn();
			})
			.catch(error => {
					if (error.response.length > 100) { 
						this.setState({
							error: true,
							errMsg: error.response.data
						});
					} else {
						this.setState({
							error: true,
							errMsg: error.response.data
						});
					}
				this.resetSaveBtn();
			});
	}

	componentWillUnmount() {
		if (source) source.cancel();
		if (timer) clearTimeout(timer);
	}

	
	handleError(error, msg) {
		if (error) {
			const timer = setTimeout(() => {
				this.setState({	// reset error msg
					error: false,
					errMsg: ''
				});
			}, 5500);
			return <div className='bannerMsgBar'>{msg}</div>;
		}
	}

	renderSaveBtn() {
   		if (this.props.edit) {
   			return (
   				<button className="submitr-btn" type="submit" name="submit_edit" ref={this.saveBtn} onClick={this.saveEdit}>
   					Save Changes
   				</button> 
   			)
   		} else {
   			return (
   				<React.Fragment>
		    		<button className="submitr-btn" type="submit" name="submit" ref={this.saveBtn} onClick={this.uploadRecipe}>
		    			Submit Recipe
		    		</button>
		    		<div id="submit-note">
		    			<div>
		    				Once submitted, recipes are reviewed for grammar and clarity.
		    				<br/>Please be patient while recipies upload.
		    			</div>
		    		</div>  
	    		</React.Fragment>
    		)
		}
	}


	render() {

		if (this.state.redirect) {
			return <Redirect to={{pathname: "/my-account"}} />;
		} else {
			return (
				<React.Fragment>

					{ this.handleError(this.state.error, this.state.errMsg) }

					<div className="accountContent">
						<div id="submit-container">
							
			           		<DeleteRecipe 
			           			edit={this.props.edit}
			           			rid={this.state.rid}
			           			redirect={this.redirect}
			           			/>

				            {	this.props.edit
				            		? <div className='my-account-titles'>Edit Recipe</div>
				            		: <div className='my-account-titles'>Submit Recipe</div>		            	
				            }

				            <div id="req-note">
								<span className="requiredStar">*</span> 
								Required
							</div>
							

							<div className='subRec-field-container'>
								<div id='img-pos'> 
									<PhotoShow 
										imageType='recipe'
										ref={this.fileRef} 
										onChange={this.fileHandler}
										file={this.state.file}
										fileName={this.state.fileName}
										fileObjURL={this.state.fileObjURL}
										/> 
								</div>
								<label className='std-field-label pos-photo-title'>Photo<span className='requiredStar'> *</span> </label>
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
									value={this.state.description}
									onChange={(e) => this.handleInput(e.target.name, e.target.value)}
									>
								</textarea>
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
									maxLength="40" 
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
									{ 	mealTypes.map((mealType, index) => 
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
										Dietary
									</label>
									<MultiSelectMenu 
										name='diet'
										options={dietOptions}
										handleInput={(e) => this.handleInput(e.target.name, e.target.value)}
										state={this.state.diet}
										/>
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



							{ this.renderSaveBtn() }


						</div>
					</div>
				</React.Fragment>
			);
		}
	}
}





export default submitRecipe;





