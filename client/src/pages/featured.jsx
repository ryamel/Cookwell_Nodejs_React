import React, { Component } from "react";
import BrowseCard from '../components/browseCard';
import './featured.sass';
// import { Link } from 'react-router-dom';


// featured titles need to be added inside the browseCard on the first of the line

class Featured extends Component {
	constructor() {
		super();
		this.state = {
			featCardData: [],
			latestCardData: [],
			isFeatLoaded: false,
			isLatestLoaded: false,
			error: null
		}
	}

	componentDidMount() {

		// no need to use relative file path for '/api/recipes' with fetch. Fetch will auto find server.js in root dir
		fetch("/api/featured-recipes/")
			.then(res => res.json())
			.then(
				(data) => {
					this.setState({
						featCardData: data,
						isFeatLoaded: true
					});
				},
				(error) => {
					this.setState({
						isFeatLoaded: true,
						error: true
					});
				}
			)
				

		// fetch('/api/latest-recipes/')
		// 	.then(res => res.json())
		// 	.then(data => this.setState({latestCardData: data}, () => console.log('got recipies', data)))
		// 	.catch(err => console.log(err));

		fetch("/api/latest-recipes/")
			.then(res => res.json())
			.then(
				(data) => {
					this.setState({
						latestCardData: data,
						isLatestLoaded: true
					});
				},
				(error) => {
					this.setState({
						isLatestLoaded: true,
						error: true
					});
				}
			)




	}



	render() {
		const { error, isFeatLoaded, isLatestLoaded, featCardData, latestCardData } = this.state;

		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isFeatLoaded) {
			return <div>Loading...</div>;
		} else {
			// console.log(latestCardData);


			return (
				// index and firstCardHeader props are used to conditionally render the featured and latest headers inside the first BrowseCard component. 
				// the headers must be renders inside the first BrowseCard components in order for the headers to have the same behaviour as the grid cards.
				<React.Fragment>

					<div className='index-grid'>
						{featCardData.map((cardData, index) => 
							<BrowseCard key={index} _id={cardData._id} img={cardData.img} description={cardData.description} author={cardData.authorName} title={cardData.title} index={index} firstCardHeader='Featured' />	
						)}
					</div>


					<div className='index-grid'>
						{latestCardData.map((cardData, index) => 
							<BrowseCard key={index} _id={cardData._id} img={cardData.img} description={cardData.description} author={cardData.authorName} title={cardData.title} index={index} firstCardHeader='Most Recent' />
						)}
					</div>

				</React.Fragment>
			);
		}
	}
}






export default Featured;