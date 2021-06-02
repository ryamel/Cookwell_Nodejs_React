import React, { Component } from 'react';
import {Link} from 'react-router-dom';


function DisplayDiet() {


	var listItems = props.diet.map(item => {
		var srcImg = process.env.PUBLIC_URL + '/user_recipes_img/' + item.replace(/\s+/g, '') + '.jpg';
		return '<img src=' + srcImg ' />' + item;
	});


	return(
		<div id='legend-container'>
			<div class='symContainer'>
				{ listItems }
			</div>
		</div>
	);
}