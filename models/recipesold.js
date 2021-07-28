const mongoose = require('mongoose');


const recipesOldSchema = new mongoose.Schema({ 
	title: {
		type: 'string'
	},
	description: {
		type: 'string'
	},
	mealType: {
		type: 'string'
	},
	diet: { 
		type: 'string'
	},
	cuisine: {
		type: 'string'
	},
	servings: {
		type: 'string'
	},
	img: {
		type: 'string'
	},
	cookTime: {
		type: 'number'
	},
	ingredients: {
		type: 'object'
	},
	method: {
		type: 'string'
	},
	notes: {
		type: 'string'
	},
	reviewed: {
		type: 'boolean'
	},
	contactedAuthor: {
		type: 'boolean'
	}
}, {collection: 'recipesold'});


module.exports = mongoose.model('Recipesold', recipesOldSchema);
