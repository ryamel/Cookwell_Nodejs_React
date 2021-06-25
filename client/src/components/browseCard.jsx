import React, { Component } from 'react';
import './browseCard.sass';
import { Link, useParams } from 'react-router-dom';

//process.env.PUBLIC_URL works for folders in the public directory

class BrowseCard extends Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		const path = process.env.PUBLIC_URL + '/recipe-page/' + this.props.rid;

		return (
			<div className='browse-card'>

				{renderHeader(this.props.index, this.props.firstCardHeader)}

				<Link to={{pathname: path}}>
					<span className='card-link'></span>
				</Link>

				<div className='browse-imgContainer'>
					<img src={process.env.PUBLIC_URL + '/user_recipes_img/' + this.props.img} alt=' '/>
				</div>

				<Link to={{pathname: "/my-account/submit-recipe", search: `?edit=true&editTitle=${this.props.title}`}} >
					<div className='edit-btn'>
						Edit
					</div>
				</Link>
				

				<div className='browse-textContainer'>
					<div className='browse-recipe-title'>{this.props.title}</div>
					<div className='browse-recipe-descrip'>{this.props.description}</div>
					<div className='browse-author'>
						<Link to={{pathname: '../pages/author-page', author: this.props.author}}>
							<span className='creator-link'>{this.props.author}</span>
						</Link>
					</div>
				</div>

			</div>
		);
	}
}

export default BrowseCard;



function renderHeader(prop, header) {
	if (header === undefined || prop === undefined) {
		return;
	}

	if (prop === 0) {
		return (
			<React.Fragment>
					<div className='feature-titles'>{header}</div>
					<div className='mediaTitle'>{header}</div>
			</React.Fragment>
		);
	}
}