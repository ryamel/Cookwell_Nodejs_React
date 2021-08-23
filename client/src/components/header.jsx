import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, NavLink, Switch, Route, Link, Redirect} from "react-router-dom";

import mastHead from '../media/brand/cookwell.png';
import search_icon from '../media/icons/search_icon.svg';
import './header.sass';

const Header = (props) => {
	const [stickyHeader, setStickyHeader] = useState('');

	const renderLogBtn = () => {
		if (props.logged_in) {
			return (
				<Link to='/my-account'>
					<div id='loginBtn' >
						<span>my account</span>
					</div>
				</Link>
			);
		} else {
			return (
				<Link to='/login-page'>
					<div id='loginBtn'>
						<span>sign in</span>
					</div>
				</Link>
			);
		}
	}


	return (
		<React.Fragment>

			<div id='headerBody' className={props.url == '/recipes' ? 'stickyHeader' : null}>

				<Link to="/" id="mast">
					<img id='masthead' src={mastHead} alt='' />
				</Link>

				<div id='navDiv'>
					<NavLink className='feat' to="/">
						FEATURED
						<div className={props.url == '/' ? 'underLine' : null }></div>
					</NavLink>
				  	<NavLink className='rec' to="/recipes">
				  		RECIPES
				  		<div className={props.url == '/recipes' ? 'underLine' : null }></div>
				  	</NavLink>
				</div>
				{ renderLogBtn() } 

				<div className={'headerSearchBar'} >
					<input 
						placeholder="Search" 
						type="text" 
						name="search" 
						value={props.searchText}
						onKeyUp={(e) => e.keyCode === 13 ? props.searchClick() : null }
						onChange={(e) => props.setSearchText(e.target.value)}
						/>
					<Link to='/search-page'>
						<button id='searchBtn' type="submit" onClick={(e) => props.searchClick()} >
							<img id="searchIcon" src={search_icon} alt='no-img' />
						</button>
					</Link>
			 	</div>
			</div>



	 	</React.Fragment>
	)

}

export default Header;