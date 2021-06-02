// constructors //

//const Recipe = mongoose.model('recipes', recipesSchema); 

const User = mongoose.model('users', userSchema); 






// user functions //

async function deleteUser(id) {
	const result = await User.deleteOne({ _id: id }, function (err) {if (err) {console.log(err);}});
	console.log(result);
}

async function createUser(displayName, pwd, email, about, srcProfileImg, insta, yt, fb, web, twitter) {
	try {
		const user = new User({
			displayName: displayName,
			pwd: pwd,
			email: email,
			about: about,
			srcProfileImg: srcProfileImg,
			insta: insta,
			yt: yt,
			fb: fb,
			web: web,
			twitter: twitter
		});
		const result = await user.save();
		console.log(result); 
	}
	catch (err) {
		console.log(err.message);
	}
}



// recipe functions //

async function uploadRecipe(authid, title, description, mealType, diet, servings, imgSrc, cookTime, ingredients, method, cusine, notes) {
	try {
		const Recipe = mongoose.model('recipes', recipesSchema); 
		const recipe = new Recipe({
			authid: authid,
			title: title,
			description: description,
			mealType: mealType,
			diet: diet,
			servings: servings,
			imgSrc: imgSrc,
			cookTime: cookTime,
			ingredients: ingredients,
			method: method,
			cusine: cusine,
			notes: notes
		});
		const result = await recipe.save();
		console.log(result); 
	}
	catch (err) {
		console.log(err.message);
	}
}

async function deleteRecipe(id) {
	const Recipe = mongoose.model('recipes', recipesSchema); 
	const result = await Recipe.deleteOne({ _id: id }, function (err) {if (err) {console.log(err);}});
	console.log(result);
}

// update example
async function updateRecipe(recipeid) {
	const Recipe = mongoose.model('recipes', recipesSchema); 
	const recipe = await Recipe.update({_id: recipeid}, {
		$set: {
			'method[0]': 'new method step text'
		}
	})
}


// TUTORIAL GET
// async function getRecipe() {
// 	const queriedRecipes = await Recipes
// 		.find({authorid: { $gt: 20 } }) //find greater than 20
// 		.limit(10)
// 		.sort({name: 1})
// 		.select({ ingredients: 1, title: 1 })
// 		.count();
// 	return queriedRecipes;
// }



// get recipe data
async function getRecipeById(id) {
	return new Promise ((resolve, reject) => { 
		try {
			const Recipe = mongoose.model('recipes', recipesSchema); 
			const query = await Recipe.find({ _id: id})
			resolve(query); // resolve == return
		}
		catch (err) {
			reject(err);
		}
	})
}



