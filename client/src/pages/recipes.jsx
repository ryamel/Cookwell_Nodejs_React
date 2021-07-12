import React, { Component } from "react";
import BrowseCard from '../components/browseCard';
import './recipes.sass';


// added task. Pagination using random recipes.


class Recipes extends Component {
	constructor() {
		super();
		this.state = {
			cardData: [],
			isLoaded: false,
			error: null
		}
	}

	componentDidMount() {
		fetch("/api/recipes/")
			.then(res => res.json())
			.then(
				(data) => {
					this.setState({
						cardData: data,
						isLoaded: true,
						error: false
					});
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error: error
					});
				}
			)
	}



	render() {
		const { error, isLoaded } = this.state;


		if (!isLoaded) {
			return null;
		} else {
			const { cardData } = this.state;
			return (
				<div className='browse-body'>
					<div className='recipe-grid-container'>
						{cardData.map((cardData, index) => 
							<BrowseCard key={index} rid={cardData._id} img={cardData.img} description={cardData.description} author={cardData.authorName} title={cardData.title} />	
						)}
					</div>
				</div>
			);
		}
	}
}






export default Recipes;