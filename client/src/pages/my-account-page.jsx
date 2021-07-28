import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, useRouteMatch, Switch, Route, Link } from "react-router-dom";
import './my-account-page.sass';

import Accountrecipes from './account-pages/account-recipes';
import Changepassword from './account-pages/change-password';
import Myprofile from './account-pages/my-profile';
import Submitrecipe from './account-pages/submit-recipe';
import Footer from '../components/footer';

function myAccountPage(props) {

	let { path, url } = useRouteMatch();
	
	//  set state of submit-recipe
	var editTitle = getParameterByName('editTitle');
	var edit = getParameterByName('edit');
	if (!edit) edit = false;
	if (!editTitle) editTitle = '';

	// nav indicator
	let currentURL = window.location.pathname;
	let { rec_indicator, sub_indicator, pro_indicator, pwd_indicator } = '';

	if ( currentURL == '/my-account' ) rec_indicator = 'borderRight';
	if ( currentURL.includes('submit-recipe') ) sub_indicator = 'borderRight';
	if ( currentURL.includes('my-profile') ) pro_indicator = 'borderRight';
	if ( currentURL.includes('change-password') ) pwd_indicator = 'borderRight';



	return(
		<React.Fragment>
			<div className='account_sideMenu_container  minBodyHeight'>

				<div className="sideMenu">
					<Link to="/my-account" className={'sideMenuOption ' + rec_indicator}>
						Recipes 
						<i className="arrow right"></i>
					</Link>

					<Link to="/my-account/submit-recipe" className={'sideMenuOption ' + sub_indicator}>
						Submit Recipe 
						<i className="arrow right"></i>
					</Link>

					<Link to="/my-account/my-profile" className={'sideMenuOption ' + pro_indicator}>
						Profile
						<i className="arrow right"></i>
					</Link>

					<Link to="/my-account/change-password" className={'sideMenuOption ' + pwd_indicator}>
						Change Password
						<i className="arrow right"></i>
					</Link>

					<Link to="/" className='sideMenuOption' onClick={props.logout}>
						Log Out 
						<i className="arrow right"></i>
					</Link>
				</div>

				<Switch>
					<Route exact path="/my-account"> 						<Accountrecipes /> 								</Route>
					<Route path="/my-account/submit-recipe"> 				<Submitrecipe editTitle={editTitle} edit={edit} /> 	</Route>
					<Route path="/my-account/my-profile"> 					<Myprofile /> 									</Route> 
					<Route path="/my-account/change-password"> 				<Changepassword /> 								</Route>
				</Switch>

			</div>

			<Footer isLoaded={true} />

		</React.Fragment>
	);
	
}


function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


export default myAccountPage;