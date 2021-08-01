const express = require('express');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true)
const mongo = require('mongodb');
require('dotenv').config();
const cors = require('cors'); 


mongoose.connect(process.env.DB_connection, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}, () => {
	console.log('connected to DB');
	// let db = mongoose.connection.db;
	// db.collection('recipesOld').rename('recipesold');
});



const { User, validateUser } = require('./models/users');
const Recipe = require('./models/recipes');
const Recipesold = require('./models/recipesold');





async function call() {
	let run = false;
	
	try {
		console.log('attempt');
		var allrecipes = await Recipesold.find();
		// console.log(allrecipes);

		//allrecipes.forEach((recipe) => {
		for (let recipe of allrecipes) {
			//console.log(recipe);
			let data = {
				diet: [],
				cusine: [],
				method: [],
				title: '',
				authid: '',
				description: '',
				mealType: '',
				servings: '',
				img: '',
				cookTime: 0,
				ingredients: [],
				notes: [],
				reviewed: false,
				contactedAuthor: false
			}

			//console.log(recipe.cookTime);
			

			data.diet = recipe.diet.split(', ');
			data.title = recipe.title;
			// leaving out authid
			data.description = recipe.description;
			data.servings = recipe.servings;
			data.img = recipe.img;
			data.cookTime = recipe.cookTime;
			data.method = recipe.method.split('|');
			data.mealType = recipe.mealType;
			data.notes = recipe.notes;
			data.authid = '60f4f185c5829428459a5b19';

			// diet
			data.diet.forEach((diet, index, array) => {
				if (diet == 'glutenFree') array[index] = 'Gluten Free';
				if (diet == 'vegetarian') array[index] = 'Vegetarian';
				if (diet == 'vegan') array[index] = 'Vegan';
				if (diet == 'keto') array[index] = 'Ketogenic';
				if (diet == 'lactoseFree') array[index] = 'Dairy Free';
				if (diet == 'nutFree') array[index] = 'Nut Free';
				if (diet == 'none') array[index] = 'None';
			})

			// methods
			if (data.mealType == 'snackAppetizer') data.mealType = 'Snacks & Appetizers';
			if (data.mealType == 'soupStew') data.mealType = 'Soups & Stews';
			if (data.mealType == 'breakfestBrunch') data.mealType = 'Breakfest & Brunch';
			if (data.mealType == 'dinner') data.mealType = 'Main Dishes';
			if (data.mealType == 'saladSideDish') data.mealType = 'Salads & Side Dishes';
			if (data.mealType == 'mainDishes') data.mealType = 'Main Dishes';
			if (data.mealType == 'sauces') data.mealType = 'Sauces';
			if (data.mealType == 'dessert') data.mealType = 'Desserts';
			if (data.mealType == 'baking') data.mealType = 'Baking';
			if (data.mealType == 'sandwiches') data.mealType = 'Sandwiches';
			

			let gtext = recipe.ingredients.ingredient.split('|');
			let qty = recipe.ingredients.quantity.split('|');
			let unit = recipe.ingredients.unit.split('|');

			// mod diet


			// mod strings in units
			unit.forEach(function(uni, index, array) {
				if (uni == 'tbsp') array[index] = 'tablespoon (Tbsp)';
				if (uni == 'cups') array[index] = 'cup(s)';
				if (uni == 'tsp') array[index] = 'teaspoon (tsp)';
				if (uni == 'oz') array[index] = 'ounce (oz)';
				if (uni == 'g') array[index] = 'gram (g)';
				if (uni == 'grams') {
					array[index] = 'gram (g)';
					run = true;
				}
				if (uni == 'ml') {
					array[index] = 'millilitre (ml)';
					run = true;
				}
				if (uni == 'sprinkle') {
					array[index] = 'pinch';
					run = true;
				}
				if (uni == 'lb') {
					array[index] = 'pound (lb)';
					run = true;
				}
			})

			// construct ingredient array
			for (var i = 0; i <= gtext.length - 1; i++) {
				data.ingredients.push({
					gtext: gtext[i],
					qty: qty[i],
					unit: unit[i]
				})
			}

			//console.log(data.diet);
			//save
			// if (run) {
			// 	try {
			// 		const rec = new Recipe(data);
			// 		await rec.save();
			// 		run = false;
			// 	}
			// 	catch (err) {
			// 		run = false;
			// 		console.log(err);
			// 	}
			// } 
		};
	}
	catch (err) {
		console.log(err);
	}
}






call();