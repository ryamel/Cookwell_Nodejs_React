import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BrowseCard from '../../components/browseCard';
import queryString from 'query-string';


class accountRecipes extends React.Component {
	constructor(props) {
		super();
		this.state = { 
			recipes: [],
			isLoaded: false,
			msg: ''
		};

		this.handleMsg = this.handleMsg.bind(this);
	}


	componentDidMount() {
		// get recipe data
		fetch('/api/recipes/get-user-recipes')
			.then(res => res.json())
			.then((data) => {
				this.setState({
					recipes: data,
					isLoaded: true
				}, console.log(data));
			})
			.catch(err => console.log(err));


		// read url params message, then place message into state so it can be displayed on screen
		var url = window.location.href;
		var urlParam = 'msg';
		urlParam = urlParam.replace(/[\[\]]/g, '\\$&');
	    var regex = new RegExp('[?&]' + urlParam + '(=([^&#]*)|&|#|$)'), 
	    	results = regex.exec(url);
	    if (!results || !results[2]) {
	    	return null;
	    } else {
	    	let m = decodeURIComponent(results[2].replace(/\+/g, ' '));
	    	m = m.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
	    	this.setState({msg: m});
	    }
		    
	}


	handleMsg(msg){
		if (msg && msg.length > 0) {
			const timer = setTimeout(() => {
				this.setState({msg: ''});
			}, 8000);
			return <div className='bannerMsgBar'>{msg}</div>;
		}
	}

	render() {
		if (!this.state.isLoaded) {
			return <div id='loading-spacer'></div>;
		} else {
			return (
				<React.Fragment>
					{ this.handleMsg(this.state.msg) }
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
				</React.Fragment>
			);
		}
	}
}





export default accountRecipes;

