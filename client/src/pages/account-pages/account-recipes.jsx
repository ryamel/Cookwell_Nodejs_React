import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BrowseCard from '../../components/browseCard';

class accountRecipes extends React.Component {
	constructor() {
		super();
		this.state = { 
			recipes: [],
			isLoaded: false,
			error: null
		};
	}


	componentDidMount() {


		fetch('/api/recipes/get-user-recipes')
			.then(res => res.json())
			.then((data) => {
				this.setState({
					recipes: data,
					isLoaded: true,
					error: false
				}, console.log(data));
			})
			.catch(err => console.log(err));
	}

	render() {

		if (!this.state.isLoaded) {
			return null;
		} else if (this.state.error) {
			return null;
		} else {
			return (
				<div className="accountContent">
					<div id="cardContainer">
						{
							this.state.recipes.map((cardData, index) => 
								<BrowseCard 
									key={index} 
									rid={cardData._id} 
									img={cardData.img} 
									description={cardData.description} 
									author={cardData.authorName} 
									title={cardData.title}
								/>	
							)
						}
				
					</div>
				</div>
			);
		}
	}
}





export default accountRecipes;

