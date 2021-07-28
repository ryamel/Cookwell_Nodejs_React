import React, { Component } from 'react';


const Dietbanner = (props) => {
	let diet = props.diet;

	if (diet.length < 1 || diet.includes('None')) {
		return null;
	} else {
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
}

export default Dietbanner;