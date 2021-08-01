import React, { Component } from "react";
import { Link } from 'react-router-dom';


function ShowResults(props) {

	const displayDietSym = (diet) => {
		if (diet.length < 1) return null;

		if (diet.includes('Vegan') && diet.includes('Vegetarian')) {
			const ind = diet.indexOf('Vegetarian');
			diet.splice(ind, 1);
		}

		return (
			<div className='symContainer-resultsPage'>
				{	diet.map((name, index) => (
						<img key={index} src={'/diet/' + name.replace(' ','') + '.svg'} /> 
					))
				}
			</div>
		);
	}

	return (
		<React.Fragment>

			<div id="results-body">
			{	props.results.map((result, index) => 
					<Link key={index}  className='resultLink' to={{pathname: process.env.PUBLIC_URL + '/recipe-page/?rtitle=' + encodeURIComponent(result.title)}} >
						<div className='result-container'>
							<div className='img-container'>
								<img src={'/user_recipes_img/card/' + result.img }/>
							</div>
							<div className='resultInfo-container'>					
								<h4>{result.title}</h4>
								<div className='description'>
									{result.description}
								</div>
								{	displayDietSym(result.diet)	}
								<div className='cooktime'>
								{	result.cookTime + ' min'	}
								</div>
							</div>
						</div>
					</Link>
				)
			}
			</div> 
		
		</React.Fragment>
	);
}








export default ShowResults;



