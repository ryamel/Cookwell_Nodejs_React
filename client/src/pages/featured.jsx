import React, { Component } from "react";
import { Link } from "react-router-dom";
import BrowseCard from '../components/browseCard';
import './featured.sass';
import Footer from '../components/footer';
import axios from 'axios';

// featured titles need to be added inside the browseCard on the first of the line

class Featured extends Component {
	constructor(props) {
		super();
		this.state = {
			featCardData: [],
			latestCardData: [],
			randomCardData: [],
			loadFooter: false
		}
		this.getFeatured = this.getFeatured.bind(this);
		this.getLatest = this.getLatest.bind(this);
		this.getMixItUp = this.getMixItUp.bind(this);
	}

	getFeatured() {
		axios.get("/api/recipes/getfeatured/")
			.then(res => {
				this.setState({featCardData: res.data});
			})
	}

	getLatest() {
		axios.get("/api/recipes/getrecent/")
			.then(res => {
				this.setState({latestCardData: res.data});
			})
	}

	getMixItUp() {
		axios.get("/api/recipes/getrandom/")
			.then(res => {
				this.setState({randomCardData: res.data});
			});
	}

	componentDidMount() {
		// no need to use relative file path for '/api/recipes' with fetch. Fetch will auto find server.js in root dir
		Promise.all([this.getFeatured(), this.getLatest(), this.getMixItUp()])
			.then(this.setState({loadFooter: true}));
	}




	render() {
		const { error, isFeatLoaded, isLatestLoaded } = this.state;
	

		if ( this.state.latestCardData.length < 1 || this.state.featCardData.length < 1 ||  this.state.randomCardData.length < 1) {
			return null;
		} else {
			const { featCardData, latestCardData, randomCardData } = this.state;

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

					<div className='index-grid'>
						{
							randomCardData.map((cardData, index) => 
								<BrowseCard 
									key={index} 
									img={cardData.img} 
									description={cardData.description} 
									author={cardData.authorName} 
									rtitle={cardData.title} 
									index={index} 
									edit={false}
									firstCardHeader='Mix It Up' 
								/>
							)
						}
					</div>


					<Footer isLoaded={this.state.loadFooter} />


				</React.Fragment>
			);
		}
	}
}






export default Featured;