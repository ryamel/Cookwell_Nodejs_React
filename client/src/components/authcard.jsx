import React, { Component } from 'react';
import { Link } from 'react-router-dom';


const Authcard = (props) => {

	if (props.name.length < 1) {
		return null;
	} else {
		return (
			<div id='author-cardN'>
				<Link to={{pathname: '/author', state: { authid: props.authid } }} >
					{/*<img src={process.env.PUBLIC_URL + '/user_profile_img/thumb/' + props.profileImg}/>*/}
					<div id='auth-name'>
						<span id='by'>By </span>
						{props.name}
					</div>
				</Link>
			</div>
		);
	}
}

export default Authcard;