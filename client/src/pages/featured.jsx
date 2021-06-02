import React, { Component } from "react";
import BrowseCard from '../components/browseCard';
import './featured.sass';
// import { Link } from 'react-router-dom';


// featured titles need to be added inside the browseCard on the first of the line

class Featured extends Component {
	constructor() {
		super();
		this.state = {
			cardData: []
		}
	}

	componentDidMount() {
		// no need to use relative file path for '/api/recipes' with fetch. Fetch will auto find server.js in root dir
		fetch('/api/recipes/')
			.then(res => res.json())
			.then(data => this.setState({cardData: data}, () => console.log('got recipies', data)))
			.catch(err => console.log(err));





		// var ingr = [
		// 	{ingrText: 'roma tomatoes', ingrQty: '5'}, 
		// 	{ingrText: 'fresh chopped basil', ingrQty: '1/4 cups'},
		// 	{ingrText: 'diced red onions', ingrQty: '1/4 cups'},
		// 	{ingrText: "minced garlic", ingrQty: '1 tbsp'},
		// 	{ingrText: 'balsamic vinegar', ingrQty: '1 tbsp'},
		// 	{ingrText: 'salt', ingrQty: '1 pinch'},
		// 	{ingrText: 'ground black pepper', ingrQty: '1 pinch'}
		// ];

		// var method = [
		// 	'Finely dice roma tomatoes. Add to a medium sized mixing bowl, and gently pat down with a paper towel to get rid of the excess liquid.',
		// 	'Finely dice red onion, and fresh basil. Add to the same mixing bowl.',
		// 	'Add in garlic, balsamic vinegar, salt (to taste), and pepper (to taste).',
		// 	'Gently stir together these ingredients.',
		// 	'Store in the fridge for at least 1 hour before serving. This allows the flavours to integrate.',
		// 	'For serving: Thinly slice pieces of baguette to ~1 inch thick. Coat with olive oil. Cook in 350℉ for about 5 minutes, or until golden brown. Pile with fresh bruschetta. Serve and enjoy!'
		// ];

		// var notes = [
		// 	{step: 6, noteText: 'Prepare the bruschetta in advance and store in the fridge overnight for easy “make-ahead” preparation that allows the flavours to really mix together.'}
		// ];

		// var title = "Bruschetta";

		// var authid = 2;

		// var description = "An Italian appetizer full of fresh ingredients and even fresher flavours that will have you day dreaming of the summer. Best served on a grilled crusty baguette with a drizzle of olive oil.";

		// var mealType = 'Snacks & Appetizers';

		// var diet = ['Dairy Free', 'Gluten Free', 'Nut Free', 'Ketogenic', 'Vegan'];

		// var cusine = ['None'];

		// var servings = '20';

		// var img = "Bruschetta_600e29fa44869.jpg";

		// var cookTime = 20;



		//post req
		// fetch('/api/postrecipe/', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Accept': 'application/json',
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify({
		// 		title:  title,
		//         authid:  authid,
		//         description:  description,
		//         mealType: mealType,
		//         diet: diet,
		//         cusine: cusine,
		//         servings: servings,
		//         img:  img,
		//         cookTime: cookTime,
		//         ingredients: ingr,
		//         method: method,
		//         notes: notes
		// 	})
		// })
		// .then(res => res.json())
		// .then(data => console.log(data))
		// .catch(err => console.log(err));




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



	}



	render() {

		


		// console.log(this.state);

		// this.state.cardData.map(card => {
		// 	const cardD = [
		// 		{id: card.id},
		// 		{title: card.title},
		// 		{description: card.description},
		// 		{imgSrc: card.imgSrc},
		// 		{author: card.author},
		// 		{link: card.link}
		// 	];
		// });

		

		return (
			<div>
				<div className='mediaTitle'>Featured</div>
				<div className='feature-titles'>Featured</div>

				<div className='index-grid'> {/*does cardData.id show in html? (security risk)*/}
					{this.state.cardData.map(cardData =>
						<BrowseCard key={cardData._id} img={cardData.img} description={cardData.description} author='MealSpace' title={cardData.title} />
					)}
		
				</div>

				<div className='mediaTitle'>Latest</div>
				<div className='feature-titles'>Latest</div>

				<div className='index-grid'>
					<BrowseCard imgSrc='test' description='dsf' author='tst' title='dsfdfs' link='./' />

				</div>
			</div>
		);
	}
}




export default Featured;