import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './recipe-page.sass';
import axios from 'axios';
import CookBanner from '../components/cookBanner';
import Notes from '../components/notes-recipe-page';
import Authcard from '../components/authcard';
import Dietbanner from '../components/dietBanner';
import { parseIngrUnit, fracToHtmlEntity } from '../functions';
let source;


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
		this.renderLink = this.renderLink.bind(this);
	}


	getParameterByName(name, url = window.location.href) {
	    name = name.replace(/[\[\]]/g, '\\$&');
	    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
	        results = regex.exec(url);
	    if (!results) return null;
	    if (!results[2]) return '';
	    return decodeURIComponent(results[2].replace(/\+/g, ' '));
	}

	renderLink() {
		if (this.state.result.authid.name == "") {
			return <span id='authName'>Anonymous</span>;
		} 
		if (this.state.result.authid.name.length > 0 && this.state.result.authid._id) {
			return (
				<Link to={{pathname: '/author', state: {authid: this.state.result.authid._id} }}>
					<span id='authName' className='hyperLink'>
						{this.state.result.authid.name}
					</span>
				</Link>
			);
		}
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
								<img src={process.env.PUBLIC_URL + '/user_recipes_img/display/' + this.state.result.img} />
							</div>
							<div id="rec-container-1-title">{this.state.result.title}</div>
							<div id='about-container'>{this.state.result.description}</div>
							{/*<div className='stat-name' id="recipePage-sym-container">display det symb</div>*/}
							{ this.renderLink() }
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
									<li key={index}> {fracToHtmlEntity(ingr.qty) + ' ' + parseIngrUnit(ingr.unit) + ' ' + ingr.gtext.toLowerCase()} </li>
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
							name={this.state.result.authid.name}
							/>

						<Dietbanner diet={this.state.result.diet} />
					</div>

					{	this.state.isLoaded && <CookBanner currentRecipe={this.state.rtitle} /> }

				</div>
			);
		}
	}
}






export default Recipepage;




