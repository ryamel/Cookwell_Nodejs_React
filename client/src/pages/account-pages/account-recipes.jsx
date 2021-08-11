import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BrowseCard from '../../components/browseCard';
import queryString from 'query-string';
import Footer from '../../components/footer';
import axios from 'axios';
let source;


class accountRecipes extends React.Component {
	constructor(props) {
		super();
		this.state = { 
			recipes: [],
			isLoaded: false,
			msg: ''
		};
		source = axios.CancelToken.source();
	}


	componentDidMount() {
		axios.get('/api/recipes/getuserrecipesprivate', {cancelToken: source.token})
			.then(res => {
				console.log(res.data);
				this.setState({
					recipes: res.data,
					isLoaded: true
				});
			})
			.catch(err => console.log(err));
		    
	}

	componentWillUnmount() {
		if (source) {
			source.cancel();
		}
	}

	render() {
		if (!this.state.isLoaded) {
			return <div id='loading-spacer'></div>;
		} else if (this.state.isLoaded && this.state.recipes.length < 1) {
			return (
				<div id='loading-spacer'>
					<div id='msg-spacer'>
						Your recipes will appear here
					</div>
				</div>
			);
		} else {
			return (
				<React.Fragment>
					{/*{ this.handleMsg(this.state.msg) }*/}
					<div className="accountContent minBodyHeight">
						<div id="cardContainer">
							{	this.state.recipes.map((cardData, index) => 
									<BrowseCard 
										key={index} 
										img={cardData.img} 
										description={cardData.description} 
										author={cardData.authid.name} 
										aId={cardData.authid._id} 
										edit={true}
										rtitle={cardData.title}
										rid={cardData._id}
										reviewed={cardData.reviewed}
										/>	
								)
							}
						</div>
					</div>
				</React.Fragment>
			);
		}
	}
}





export default accountRecipes;

