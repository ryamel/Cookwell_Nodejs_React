const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/cookwell', { useNewUrlParser: true } ) // this will be different for production. It will come from config file
	.then(() => console.log('Connected to MongoDB...'))
	.catch(err => console.error('Could not connect to MongoDB...', err));



// module to create or delete users/recipies
const db = require('./models_mong');


var ingr = [
	{ingrText: 'all purpose flour', ingrQty: '1 1/2 cups'}, 
	{ingrText: 'salt', ingrQty: '½ tsp'},
	{ingrText: 'granulated sugar', ingrQty: '¾ cups'},
	{ingrText: 'mashed overripe bananas, about 3 bananas', ingrQty: '1 cups'},
	{ingrText: 'egg', ingrQty: '1'},
	{ingrText: 'baking soda', ingrQty: '1 tsp'},
	{ingrText: 'vegetable oil', ingrQty: '1/2 cups'},
	{ingrText: 'vanilla extract', ingrQty: '1 tsp'},
	{ingrText: 'milk chocolate chips', ingrQty: '3/4 cups'},
	{ingrText: 'crushed walnuts', ingrQty: '1/2 cups'}
];

var descrip = 'Fluffy, moist and full of flavour with a mouthful of chocolate and walnuts in every bite.. This is the best way to use up all of those bananas you forgot to eat in time.';
var title = 'Banana Chocolate Walnut Muffins';
var mealType = 'Sauces';
var diet = ['None'];
var servings = '12 muffins';
var imgSrc = './media/recipePhotos/BananaChocolateWalnutMuffins.jpg';
var method = [
	'Set aside a small handful of walnuts for decoration. Preheat your oven to 350°F.',
	'In a large mixing bowl add flour, salt, baking soda, chocolate chips and walnuts. Mix all dry ingredients together.',
	'In a second bowl add the rest of the ingredients, egg, banana, oil, sugar and vanilla extract. Mix well until combined.',
	'Add the wet ingredients to the dry ingredients and stir together until just combined and you can see no more dry flour. Do not overwork the mixture.',
	'Lightly grease a muffin pan and scoop the muffin mixture into the pan until it’s just below the brim but do not overfill. This will ensure for a good rise and round muffin top.',
	'Sprinkle the walnuts you set aside earlier on top of the mixture and place into the oven for about 15 - 18 minutes or until a toothpick poked into the muffin comes out clean.'
];
var notes = [
	{step: 6, noteText: 'It’s easy to assume the muffins are under done as a cooked muffin will still be very moist. Be careful to not overcook your muffins.'}
];



//db.uploadRecipe(21, title , descrip, mealType, diet, servings, imgSrc, 40, ingr, method, ['None'], notes);






var ingr = [
	{ingrText: 'butternut squash', ingrQty: '1'}, 
	{ingrText: 'yellow onion', ingrQty: '1'}, 
	{ingrText: 'green apple', ingrQty: '1'}, 
	{ingrText: 'carrot', ingrQty: '1'}, 
	{ingrText: 'vegetable stock', ingrQty: '4 cups '}, 
	{ingrText: 'ground nutmeg', ingrQty: '1/2 tsp'}, 
	{ingrText: 'ground cinnamon', ingrQty: '1/2 tsp'}, 
	{ingrText: 'cayenne pepper', ingrQty: '1 dash'}, 
	{ingrText: 'salt', ingrQty: '1 tsp'}, 
	{ingrText: 'olive oil', ingrQty: '4 tbsp'}, 
	{ingrText: 'ground black pepper', ingrQty: '1 tsp'}
];

var descrip = 'A creamy, hearty and buttery soup perfect to warm you up in the cold of winter with seasonal spice hints of nutmeg, cinnamon and just a touch of heat.';
var title = 'Roasted Butternut Squash Soup';
var mealType = 'Soups & Stews';
var diet = ['Lactose Free', 'Nut Free', 'Vegan', 'Gluten Free', 'Ketogenic'];
var servings = '6';
var imgSrc = './media/recipePhotos/RoastedButternutSquashSoup.jpg';
var method = [
	'Cut your butternut squash down the center lengthways and scoop out all the seeds using a metal spoon. Place the squash on a baking pan flesh side up and cover the flesh with half of the olive oil, salt and pepper. Roast in the oven for about 45 minutes to an hour until the flesh is soft and can be pierced with a knife without any resistance.',
	'Peel and cut your apple, carrots and onion and place them in a large pot with the other half of the olive oil. Gently cook on low heat until everything is soft and caramelized.',
	'When the squashed is cooked through scoop the flesh away from the skin using a metal spoon and place into the pot with the other ingredients.',
	'Add the 4 cups of vegetable stock and using an immersion blender, blend the ingredients until smooth and silky.',
	'Add the remaining spices and allow the soup to simmer on low heat for at least 20 minutes to develop flavours. At this point if you want a thicker soup simmer for longer, if you want it thinner add more vegetable stock. Adjust spices to your taste as desired.',
	'Serve optionally with a slash of coconut milk, greek yogurt, or heavy cream.'
];
var notes = [];
var cuisine = ['None'];
var cooktime = 80;

//db.uploadRecipe('60a975a074db96507485e17e', title , descrip, mealType, diet, servings, imgSrc, cooktime, ingr, method, cuisine, notes);

var displayName = 'Mealspace';
var pwd = 'admin4546';
var email = 'rya_mel@hotmail.com';
var about = 'Just a gent';
var srcProfileImg = './media/userProfilePhotos/mealSpace.jpg'
var insta = '';
var yt = '';
var fb = '';
var web = '';
var twitter = '';


//db.createUser(displayName, pwd, email, about, srcProfileImg, insta, yt, fb, web, twitter);


// console.log('before');
// getUser(1, (user) => console.log('User', user));
// console.log('after');



// function getUser(id, callback) {
// 	setTimeout(() => {
// 		console.log('Reading database...');
// 		callback({ id: id, userNmae: 'Buddy'});
// 	}, 2000);
// }


// function getRep(username) {
// 	setTimeout(() => {
// 		callback
// 	})
// 	return ['repo1', 'repo2', 'repo3'];
// }


const p = db.getRecipeById('60a9741acc284e502b2743cc');
console.log(p);




