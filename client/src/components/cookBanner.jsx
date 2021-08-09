import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './cookBanner.sass';
//import photoIcon from '../../public/user_profile_img/CHange_Name_16246155695775.jpeg';
let recipeDirectory;
if (process.env.NODE_ENV == 'production') {
	let recipeDirectory = process.env.PUBLIC_URL + '/user_recipes_img/card/';
} else {
	let recipeDirectory = '../../public/user_recipes_img/card/';
}


const CookBanner = (props) => {
	const [recipeData, setRecipeData] = useState([]);


	useEffect(() => {
		let source = axios.CancelToken.source();
		const data = JSON.stringify({currentRecipe: props.currentRecipe});

		axios.post('/api/recipes/getcookbanner', data, {cancelToken: source.token}, { headers: {'Content-Type': 'application/json'} })
			.then((res) => { setRecipeData(res.data) })
			.catch((err) => { console.log(err) });

		return () => source.cancel();
	}, [props.currentRecipe])


	if (!recipeData) {
		return null;
	} else {
		return(
			<div id='left-bannerN'>
				<div id='moreByAuthor-load-container'>
					{ 	
						recipeData.map((recipe, index) => 
							<div className='more-banner-cardN' key={index}>
								<Link to={{pathname: process.env.PUBLIC_URL + '/recipe-page/?rtitle=' + encodeURIComponent(recipe.title)}}>
									<img src={recipeDirectory + recipe.img} />
									<div className='titleInfo'>
										{recipe.title}
									</div>
								</Link>
							</div>
						)
					}
				</div>
			</div>
		);
	}
}



export default CookBanner;