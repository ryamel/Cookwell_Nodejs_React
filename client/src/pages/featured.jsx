import React, { Component } from "react";
import { Link } from "react-router-dom";
import BrowseCard from '../components/browseCard';
import './featured.sass';
import Footer from '../components/footer';
import axios from 'axios';
let source;


class Featured extends Component {
	constructor(props) {
		super();
		this.state = {
			featCardData: [],
			latestCardData: [],
			randomCardData: [],
			loadFooter: false
		}
		source = axios.CancelToken.source();
		this.getFeatured = this.getFeatured.bind(this);
		this.getLatest = this.getLatest.bind(this);
		this.getMixItUp = this.getMixItUp.bind(this);
	}

	getFeatured() {
		axios.get("/api/recipes/getfeatured/", {cancelToken: source.token})
			.then(res => {
				//console.log('featured', res.data);
				this.setState({featCardData: res.data});
			})
			.catch(err => {
				//console.log(err)
			});
	}

	getLatest() {
		axios.get("/api/recipes/getrecent/", {cancelToken: source.token})
			.then(res => {
				//console.log('recent', res.data);
				this.setState({latestCardData: res.data});
			})
			.catch(err => {
				//console.log(err)
			});
	}

	getMixItUp() {
		axios.get("/api/recipes/getrandom/", {cancelToken: source.token})
			.then(res => {
				//console.log('random', res.data);
				this.setState({randomCardData: res.data});
			})
			.catch(err => {
				//console.log(err)
			});
	}

	componentDidMount() {
		// no need to use relative file path for '/api/recipes' with fetch. Fetch will auto find server.js in root dir
		Promise.all([this.getFeatured(), this.getLatest(), this.getMixItUp()])
			.then(this.setState({loadFooter: true}));
	}

	componentWillUnmount() {
		if (source) source.cancel();
	}




	render() {
		if ( this.state.latestCardData.length < 1 || this.state.featCardData.length < 1 || this.state.randomCardData.length < 1 ) {
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
									author={cardData.authid.name} 
									aId={cardData.authid._id} 
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
									author={cardData.authid.name} 
									aId={cardData.authid._id} 
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
									author={cardData.authid.name} 
									aId={cardData.authid._id} 
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