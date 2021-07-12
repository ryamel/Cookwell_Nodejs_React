import React, { Component } from "react";
import BrowseCard from '../components/browseCard';
import './featured.sass';
//import { Route, Redirect } from 'react-router'

// featured titles need to be added inside the browseCard on the first of the line

class Featured extends Component {
	constructor(props) {
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
		
		//if (window.location.pathname) console.log('hello');
		// if (typeof this.props.location !== 'undefined') {
		// 	console.log(this.props.location.state.ref);
		// }

		// no need to use relative file path for '/api/recipes' with fetch. Fetch will auto find server.js in root dir
		fetch("/api/recipes/get-featured/")
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
				

		fetch("/api/recipes/get-latest/")
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
						error: error
					});
				}
			)
	}



	render() {
		const { error, isFeatLoaded, isLatestLoaded } = this.state;

		if ( !isFeatLoaded || !isLatestLoaded ) {
			return null;
		} else {

			const { featCardData, latestCardData } = this.state;

			return (
				// index and firstCardHeader propeties are used to conditionally render the featured and latest headers inside the first BrowseCard component. 
				// this is because the headers must be rendered inside the first BrowseCard components in order for the headers to have the same behaviour as the grid cards. Oulined by the css grid attributes.
				<React.Fragment>

					<div className='index-grid'>
						{
							featCardData.map((cardData, index) => 
								<BrowseCard 
									key={index} 
									img={cardData.img} 
									description={cardData.description} 
									author={cardData.authorName} 
									rtitle={cardData.title} 
									index={index} 
									edit={false}
									firstCardHeader='Featured' 
								/>	
							)
						}
					</div>

					<div className='index-grid'>
						{
							latestCardData.map((cardData, index) => 
								<BrowseCard 
									key={index} 
									img={cardData.img} 
									description={cardData.description} 
									author={cardData.authorName} 
									rtitle={cardData.title} 
									index={index} 
									edit={false}
									firstCardHeader='Most Recent' 
								/>
							)
						}
					</div>

				</React.Fragment>
			);
		}
	}
}






export default Featured;