
const mongoose = require('mongoose');



const ingrSchema = new mongoose.Schema({
	gtext: 'string',
	qty: 'string',
	unit: {
		type: 'string',
		enum: [
			'none',
			'teaspoon (tsp)',
			'tablespoon (Tbsp)',
			'cup(s)',
			'fluid ounce (floz)',
			'ounce (oz)',
			'pound (lb)',
			'small',
			'medium',
			'large',
			'millilitre (ml)',
			'litre (L)',
			'milligram (mg)',
			'gram (g)',
			'killogram (kg)',
			'centimeter (cm)',
			'inch (in)',
			'dash',
			'pinch',
			'gal',
			'fluid pint (fl pt)',
			'fluid quart (fl qt)',
			'gill'
		]
	}
}, { _id : false });



const recipesSchema = new mongoose.Schema({ 
	title: {
		type: 'string',
		required: true,
		minLength: 3,
		maxLength: 80
	},
	authid: {
		type: 'ObjectId',
		required: true,
		min: 0
	},
	description: {
		required: true,
		type: 'string',
		maxLength: 500
	},
	mealType: { // check for duplicates
		required: true,
		type: 'string',
		enum: [
			'Breakfest & Brunch',
			'Soups & Stews',
			'Sauces',
			'Sandwiches',
			'Main Dishes',
			'Desserts',
			'Drinks',
			'Snacks & Appetizers',
			'Salads & Side Dishes',
			'Baking'
		],
	},
	diet: { // check for duplicates
		required: true,
		type: ['string'],
		enum: [
			'Gluten Free',
			'Vegetarian',
			'Vegan',
			'Ketogenic',
			'Dairy Free',
			'Nut Free',
			'None'
		]
	},
	cuisine: { // check for duplicates
		type: ['string'],
		enum: [
			'American',
			'Asian',
			'Caribbean',
			'Chinese',
			'French',
			'German',
			'Greek',
			'Hawaiian',
			'Korean',
			'Mediterranean',
			'Mexican',
			'Thai',
			'Indonesian',
			'Indian',
			'Italian',
			'Soul Food',
			'Spanish',
			'Western'
		]
	},
	servings: {
		required: true,
		type: 'string',
		trim: true
	},
	img: {
		required: true,
		type: 'string'
	},
	cookTime: {
		required: true,
		type: 'number',
		trim: true,
		min: 0
	},
	ingredients: {
		required: true,
		type: [ingrSchema]
	},
	method: {
		required: true,
		type: ['string']
	},
	notes: {
		type: ['string'],
		required: false
	},
	uploadDate: {
		type: Date,
		default: Date.now
	},
	authorName: {
		type: 'string'
	}
});

// recipesSchema.index( { title: "text", description: "text" } );

module.exports = mongoose.model('Recipes', recipesSchema);







