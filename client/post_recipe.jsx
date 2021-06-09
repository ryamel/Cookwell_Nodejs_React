

	const express = require('express');

	const app = express();

	app.use(express.json());

	const Joi = require('joi'); // upper case named because module returns a Class

	const mongo = require('mongodb');

	const assert = require('assert');

	const mongoose = require('mongoose');

	// require('dotenv/config');
	require('dotenv').config();

	const port = process.env.PORT || 5000; // 3000

	mongoose.connect(process.env.DB_connection, {
		useNewUrlParser: true, 
		useUnifiedTopology: true 
	}, () => console.log('connected to DB'));


	// upload to DB


	var ingr = [
		{text: 'large salmon fillet, divided into 3', qty: '1'},
		{text: 'mayonnaise', qty: '1 tbsp'}, 
		{text: 'dijon mustard', qty: '1 tbsp'}, 
		{text: 'panko crumbs', qty: '1/2 cups'}, 
		{text: 'thyme', qty: '1 1/2 tsp'}, 
		{text: '1 tsp', qty: 'rosemary'},
		{text: 'freshly cracked black pepper', qty: '1 tsp'},
		{text: 'butter', qty: '1 tbsp'}
	];

	var method = [
		'In a small non stick fry pan on low heat melt the butter and add the panko crumbs, thyme, pepper and rosemary. Gently toss mixture until golden brown.',
		'Mix together the mayonnaise and dijon mustard, this will be the glue for the bread crumbs to stick to the salmon.',
		'On a lined baking sheet place the salmon fillets and coat the tops with the may mustard mixture. Gently press the crumb herb mixture onto the salmon with your fingers to ensure it sticks.',
		'Bake the salmon fillets in a 350°F oven for 15 - 20 minutes or until their internal temperature reaches 145°F.'
	];

	var title = "Herb Crusted Baked Salmon Fillets";

	var authid = '2';

	var description = "Salmon coated with a crispy buttery toasted panko crumb crust infused with thyme, rosemary and pepper. So simply to make you'll never bake Salmon without it again.";

	var mealType = 'Main Dishes';

	var diet = ['Nut Free', 'Ketogenic'];

	var cusine = ['None'];

	var servings = '3';

	var img = "Herb_Crusted_Baked_Salmon_Fillets__600ce6c617dc7_medium.jpg";

	var cookTime = 25;


	//post req
	fetch('/api/postrecipe/', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			title: title,
	        authid: authid,
	        description: description,
	        mealType: mealType,
	        diet: diet,
	        cusine: cusine,
	        servings: servings,
	        img: img,
	        cookTime: cookTime,
	        ingredients: ingr,
	        method: method
		})
	})
	.then(res => res.json())
	.then(data => console.log(data))
	.catch(err => console.log(err));




	// //post req users
	// fetch('/api/postusers/', {
	// 	method: 'POST',
	// 	headers: {
	// 		'Accept': 'application/json',
	// 		'Content-Type': 'application/json'
	// 	},
	// 	body: JSON.stringify({
	//         displayName:  'displayName',
	//         pwd: 'password123',
	//         email: 'ryamel70@gmail.com',
	//         about: 'about me description test case min 40 character, about me lormipsum blah yadda heloo the lazy fox jumped over'
	// 	})
	// })
	// .then(res => res.json())
	// .then(data => console.log(data))
	// .catch(err => console.log(err));


