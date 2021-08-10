import React, { Component } from 'react';
import './browseCard.sass';
import { Link, useParams } from 'react-router-dom';



class BrowseCard extends Component {
	constructor(props) {
		super();
		this.state = {};
		this.renderHeader = this.renderHeader.bind(this);
		this.renderEditBtn = this.renderEditBtn.bind(this);
		this.renderLink = this.renderLink.bind(this);
		this.checkImg = this.checkImg.bind(this);
		this.bcard = React.createRef();
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

	// if the img loader has an error, dont display that browse card. Unless its on the user account page.
	checkImg() {
		if (!this.props.edit) this.bcard.current.style.display = "none";
	}


	render() {
		return (
			<div className='browse-card' ref={this.bcard}>

				{ this.renderHeader() }

				<Link to={{pathname: process.env.PUBLIC_URL + '/recipe-page/?rtitle=' + encodeURIComponent(this.props.rtitle)}}>
					<span className='card-link'></span>
				</Link>

				<div className='browse-imgContainer'>
					<img src={'/user_recipes_img/card/' + this.props.img} onError={() => this.checkImg()} alt=' '/>
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



