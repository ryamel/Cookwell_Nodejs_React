
const mongoose = require('mongoose');





const ingrSchema = new mongoose.Schema(
	{
		text: 'string',
		qty: 'string'
	}
);

const noteSchema = new mongoose.Schema(
	{
		step: 'number',
		text: 'string'
	}
);


const recipesSchema = new mongoose.Schema({ 
	title: {
		type: 'string',
		required: true,
		minLength: 0,
		maxLength: 60
	},
	authid: {
		type: 'ObjectId',
		required: true,
		min: 0
	},
	description: {
		required: true,
		type: 'string',
		minLength: 0,
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
		],
		validate: {
			validator: function (v) {  // v is the element that was passed
				if (v.length < 1) {
					return 0;
				};
				if (v.includes('None') && v.length > 1 ) {
					return 0;
				}
			},
			message: "Invalid diet selection"
		}
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
			'Western',
			'None'
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
		type: [ingrSchema], // embedded document
		required: true
	},
	method: {
		required: true,
		type: ['string'],
		validate: {
			validator: function (v) {
				return v && v.length > 0;
		},
			message: "Method should have at least 1 entry"
		}
	},
	notes: {
		type: [noteSchema],
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

module.exports = mongoose.model('Recipes', recipesSchema);;







