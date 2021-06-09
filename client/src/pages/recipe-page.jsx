import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './recipe-page.sass';
import { useParams } from 'react-router-dom';
import queryString from 'query-string';




function Recipepage() {

	const [state, setState] = useState({});
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);

	let { id } = useParams();


	useEffect(() => {

		fetch('/api/recipes/getbyid/' + id)
			.then(res => res.json())
			.then(
				(result) => {
					setState({result});
					setIsLoaded(true);
					console.log(result);
				}, // setState is an sync function!
				(error) => {
					setError(error);
					setIsLoaded(true);
				} // handle errors without the try catch block. Avoids react bugs in components
			);

	}, []);



	if (error) {
		return <div> Error: {error} </div>
	} else if (!isLoaded)  {
		return <div>Loading...</div>;
	} else {
		return(
			<div className="recipe-page-container">
				<div id="recipe-content-banner">

					<div id="rec-container-1">

						<div id='recipe-img-container'>
							<img src={process.env.PUBLIC_URL + '/user_recipes_img/' + state.result.img} />
						</div>

						<div id="rec-container-1-title">{state.result.title}</div>
						<div id='about-container'>{state.result.description}</div>
						<div className='stat-name' id="recipePage-sym-container">display det symb</div>

						<div id='stat-container'>
							<div id="float-container">

								<div id='stat-name-container'>
									<div className='stat-name'>Time </div>
									<div className='stat-name'>Serves </div>
								</div>

								<div id="stat-number-container">
									<div className='stat-name'>{state.result.cookTime + ' min'}</div>
									<div className='stat-name'>{state.result.servings}</div>
								</div>

							</div>
						</div>

					</div>

					<div id="rec-container-2">
						<div className='rec-container-headings'>
							INGREDIENTS 
						</div>
						<ul>
							{state.result.ingredients.map((ingr, index) => (
								<li key={index}> {fracToHtmlEntity(ingr.qty) + ' ' + ingr.text} </li>
							))}	
						</ul>
					</div>

					<div id="rec-container-3">
						<div className='rec-container-headings'>
							METHOD
						</div>
						<ol>
							{state.result.method.map((method, index) => (
								<li key={index}> {method} </li>
							))}	
						</ol>
					</div>

					<div id='rec-container-4'>
						<div className='rec-container-headings' id='note-title'>
							NOTES
						</div>
						<div className='note-container'>
							<ul>
								{state.result.notes.map((note, index) => (
									<li key={index}>
										<span className='noteNum'> Step {note.step}</span> 
										<span className='note'> {note.text}</span>
									</li>
								))}	
							</ul>
						</div>
					</div>

				</div>

				<div id="right-banner">
					{displayDietBanner(state.result.diet)}

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

{/*				<div id='rec-container-5'>

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



function displayDietBanner(diet) {

	if (diet.length < 1) {
		return null;
	}

	if (diet.includes('Vegan') && diet.includes('Vegetarian')) {
		const ind = diet.indexOf('Vegetarian');
		diet.splice(ind, 1);
	}

	return (
		<div id='legend-container'>
			{ 
				diet.map((name, index) => (
					<div key={index} className='symContainer'>
						<img src={process.env.PUBLIC_URL + '/diet/' + name.replace(' ','') + '.svg'} /> 
						<span className='dietName'>{name}</span>
					</div>
				))
			}
		</div>
	);

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




