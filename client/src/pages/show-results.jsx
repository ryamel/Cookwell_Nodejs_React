import React, { Component } from "react";
import { Link } from 'react-router-dom';





function ShowResults(props) {

	if (props.error) {
		return <div>There was an unknown error</div>;
	} else if (!props.isLoaded) {
		return null;
	} else {
		return (
			<React.Fragment>

				<div id="results-body">
				{
					props.results.map((result, index) => 
						<Link key={index}  className='resultLink' to={'/recipe-page/' + result._id} >
							<div className='result-container'>
								<div className='img-container'>
									<img className='r_img' src={'/user_recipes_img/' + result.img }/>
								</div>
								<div className='resultInfo-container'>					
									<h4>{result.title}</h4>
									<div className='description'>
										{result.description}
									</div>
									{ 
										displayDietSym(result.diet) 
									}
									<div className='cooktime'>
										{result.cookTime + ' min'}
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
}



function displayDietSym(diet) {



	if (diet.length < 1) {
		return null;
	}

	if (diet.includes('Vegan') && diet.includes('Vegetarian')) {
		const ind = diet.indexOf('Vegetarian');
		diet.splice(ind, 1);
	}

	return (
		<div className='symContainer-resultsPage'>
			{ 

				diet.map((name, index) => (
					<img key={index} src={'/diet/' + name.replace(' ','') + '.svg'} /> 
				))
			}
		</div>
	);

}




export default ShowResults;



