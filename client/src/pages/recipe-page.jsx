import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './recipe-page.sass';
import axios from 'axios';
import CookBanner from '../components/cookBanner';
import Notes from '../components/notes-recipe-page';
import Authcard from '../components/authcard';
import Dietbanner from '../components/dietBanner';
let source;
var recipeDirectory;

if (process.env.production == true) {
	recipeDirectory = '/mnt/volume1/user_recipes_img/display/';
} else {
	recipeDirectory = '/user_recipes_img/display/';
}

class Recipepage extends Component {
	constructor() {
		super();
		this.state = {
			isLoaded: false,
			result: null,
			rtitle: ''
		}	
		source = axios.CancelToken.source();
		this.getParameterByName = this.getParameterByName.bind(this);
		this.loadRecipe = this.loadRecipe.bind(this);
	}


	getParameterByName(name, url = window.location.href) {
	    name = name.replace(/[\[\]]/g, '\\$&');
	    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
	        results = regex.exec(url);
	    if (!results) return null;
	    if (!results[2]) return '';
	    return decodeURIComponent(results[2].replace(/\+/g, ' '));
	}
	

	loadRecipe(rtitle) {
		axios.get('/api/recipes/getbytitle/' + rtitle, {cancelToken: source.token})
			.then(res => {
				this.setState({
					result: res.data,
					isLoaded: true,
					rtitle: rtitle
				})
			})
			.catch(error => {
				this.setState({
					isLoaded: false
				});
				console.log(error);
			})	
	}

	componentDidMount() {
		let titleURL = this.getParameterByName('rtitle');
		this.loadRecipe(titleURL);
	}

	componentWillUnmount() {
		if (source) source.cancel();
	}


	render() {
		let titleURL = this.getParameterByName('rtitle');
		if (this.state.isLoaded && this.state.rtitle !== titleURL) this.loadRecipe(titleURL);
		

		if (!this.state.isLoaded)  {
			return null;
		} else {
			return(
				<div id="recipe-page-container">
					<div id="recipe-content-banner">

						<div id="rec-container-1">

							<div id='recipe-img-container'>
								<img src={process.env.PUBLIC_URL + recipeDirectory + this.state.result.img} />
							</div>

							<div id="rec-container-1-title">{this.state.result.title}</div>
							<div id='about-container'>{this.state.result.description}</div>
							<div className='stat-name' id="recipePage-sym-container">display det symb</div>

							<div id='stat-container'>
								<div id="float-container">

									<div id='stat-name-container'>
										<div className='stat-name'>Time </div>
										<div className='stat-name'>Serves </div>
									</div>

									<div id="stat-number-container">
										<div className='stat-name'>{this.state.result.cookTime + ' min'}</div>
										<div className='stat-name'>{this.state.result.servings}</div>
									</div>

								</div>
							</div>

						</div>

						<div id="rec-container-2">
							<div className='rec-container-headings'>
								INGREDIENTS 
							</div>
							<ul>
								{this.state.result.ingredients.map((ingr, index) => (
									<li key={index}> {fracToHtmlEntity(ingr.qty) + ' ' + ingr.gtext} </li>
								))}	
							</ul>
						</div>


						<div id="rec-container-3">
							<div className='rec-container-headings'>
								METHOD
							</div>
							<ol>
								{this.state.result.method.map((method, index) => (
									<li key={index}> {method} </li>
								))}	
							</ol>
						</div>


						<Notes notes={this.state.result.notes} />


					</div>

					<div id="right-banner">
						<Authcard 
							authid={this.state.result.authid._id} 
							profileImg={this.state.result.authid.profileImg}
							name={this.state.result.authid.name}
							/>

						<Dietbanner diet={this.state.result.diet} />

					{/*	{	this.displayDietBanner(this.state.result.diet)	}*/}

	{/*					<div id="share-this-container">

							<div id="title">Share this recipe</div>

							<div id="ad-flexbox-container">
								<div><a href="#" className="fa fa-facebook"></a></div>
								<div><a href="#" className="fa fa-twitter"></a></div>
								<div><a href="#" className="fa fa-pinterest"></a></div>
								<div><a href="#" className="fa fa-envelope"></a></div>
							</div>

						</div>*/}
					</div>


					{	this.state.isLoaded && 
						<CookBanner currentRecipe={this.state.rtitle} />
					}

{/*					<div id='rec-container-5'>

						<div className='rec-container-headings-5'>
							RECOMENDED
						</div>

						<div>
							<div className='more-banner-card more-recomended'>
								<Link to='/'>
									<img src='Media/user_recipe_images/' />
									<div className='overlay'>
										<div className='overlay-title'></div>
									</div>
								</Link>
							</div>
						</div>
					</div> */}

				</div>
			);
		}
	}
}








function fracToHtmlEntity(string) {

	// identify fraction in string
	const index = string.indexOf('/'); // indexOf retuns -1 if character not found
	const num1 = parseInt(string[index-1]); // parseInt returns NaN if input is not string
	const num2 = parseInt(string[index+1]);

	// error check
	if (num1 === NaN || num2 === NaN || index === -1) {
		return string;
	}

	// seperate string components
	const firstHalf = string.substring(0, index-1).replace(' ', '');
	const secondHalf = string.substring(index+2);

	// determine unicode value
	if (num1 === 1 && num2 === 4) {
		var unicode = 188;
	} else if (num1 === 1 && num2 === 2) {
		var unicode = 189;
	} else if (num1 === 3 && num2 === 4) {
		var unicode = 190;
	} else if (num1 === 1 && num2 === 7) {
		var unicode = 8528;
	} else if (num1 === 1 && num2 === 9) {
		var unicode = 8529;
	} else if (num1 === 1 && num2 === 10) {
		var unicode = 8530;
	} else if (num1 === 1 && num2 === 3) {
		var unicode = 8531;
	} else if (num1 === 2 && num2 === 3) {
		var unicode = 8532;
	} else if (num1 === 1 && num2 === 5) {
		var unicode = 8533;
	} else if (num1 === 2 && num2 === 5) {
		var unicode = 8534;
	} else if (num1 === 3 && num2 === 5) {
		var unicode = 8535;
	} else if (num1 === 4 && num2 === 5) {
		var unicode = 8536;
	} else if (num1 === 1 && num2 === 6) {
		var unicode = 8537;
	} else if (num1 === 5 && num2 === 6) {
		var unicode = 8538;
	} else if (num1 === 1 && num2 === 8) {
		var unicode = 8539;
	} else if (num1 === 3 && num2 === 8) {
		var unicode = 8540;
	} else if (num1 === 5 && num2 === 8) {
		var unicode = 8541;
	} else if (num1 === 7 && num2 === 8) {
		var unicode = 8542; 
	} else {
		return string;
	}

	return firstHalf + String.fromCharCode(unicode) + secondHalf;
}




export default Recipepage;




