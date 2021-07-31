import React, { Component } from "react";
import {Link} from 'react-router-dom';


class CookProfile extends Component {
	render() {
		return (
			<div className='cookProfileContainer'>
				<Link>{this.props.cookLink}</Link>
				<div className='leftCon'>
					<img className='imgCook' src={this.props.imgLocation} />
					<div className='title'>
						{this.props.cookName}
					</div>
					<Link className='web'>{this.props.web}</Link>
				</div>
				<div className='rightCon'>{this.props.description}</div>
			</div>
		)
	}
}


export default CookProfile;