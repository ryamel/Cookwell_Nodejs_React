import React, { Component } from 'react';
import './browseCard.sass';
import { Link, useParams } from 'react-router-dom';

//process.env.PUBLIC_URL works for folders in the public directory

class BrowseCard extends Component {
	constructor(props) {
		super();
		this.state = {};
		this.renderHeader = this.renderHeader.bind(this);
		this.renderEditBtn = this.renderEditBtn.bind(this);
		this.renderLink = this.renderLink.bind(this);
	}


	renderHeader() {
		if (this.props.firstCardHeader === undefined || this.props.index === undefined) {
			return null;
		} else if (this.props.index === 0) {
			return (
				<React.Fragment>
						<div className='feature-titles'>{this.props.firstCardHeader}</div>
				</React.Fragment>
			);
		}
	}

	renderEditBtn() {
		if (this.props.edit && this.props.rid) {
			return (
				<Link to={{pathname: "/my-account/submit-recipe", search: `?edit=true&editId=${this.props.rid}`}} >
					<div className='edit-btn'>
						Edit
					</div>
				</Link>
			);
		}
	}

	renderLink() {
		if (this.props.author == "") {
			return <span className='authLink noHover'>Anonymous</span>;
		} 
		if (this.props.author.length > 0) {
			return (
				<Link to={{pathname: '/author', state: { authid: this.props.aId } }}>
					<span className='authLink'>
						{	this.props.author.length > 0 ? this.props.author : 'Anonymous'}
					</span>
				</Link>
			);
		}
	}	

	render() {
		return (
			<div className='browse-card'>

				{ this.renderHeader() }

				<Link to={{pathname: process.env.PUBLIC_URL + '/recipe-page/?rtitle=' + encodeURIComponent(this.props.rtitle)}}>
					<span className='card-link'></span>
				</Link>

				<div className='browse-imgContainer'>
					<img src={process.env.PUBLIC_URL + '/user_recipes_img/display/' + this.props.img} alt=' '/>
				</div>

				{ this.renderEditBtn() }
				

				<div className='browse-textContainer'>
					<div className='maxHeight'>
						<div className='browse-recipe-title'>{this.props.rtitle}</div>
						<div className='browse-recipe-descrip'>{this.props.description}</div>
						<div className='browse-author'>
							{ this.renderLink() }
						</div>
					</div>
				</div>

			</div>
		);
	}
}

export default BrowseCard;



