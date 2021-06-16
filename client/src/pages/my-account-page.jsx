import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Switch, Route, Link } from "react-router-dom";
import './my-account-page.sass';


import Accountrecipes from './account-pages/account-recipes';
import Changepassword from './account-pages/change-password';
import Myprofile from './account-pages/my-profile';
import Submitrecipe from './account-pages/submit-recipe';


class myAccountPage extends React.Component {
	constructor() {
		super();
		this.state = {};
	}



	render() {
		return(
			<Router>
				<div className='accountBody'>


					<div className="sideMenu">

						<Link to="/account-recipes" className='sideMenuOption'>
							Recipes 
							<i className="arrow right"></i>
						</Link>

						<Link to="/submit-recipe" className='sideMenuOption'>
							Submit Recipe 
							<i className="arrow right"></i>
						</Link>

						<Link to="/my-profile" className='sideMenuOption'>
							Profile
							<i className="arrow right"></i>
						</Link>

						<Link to="/change-password" className='sideMenuOption'>
							Change Password
							<i className="arrow right"></i>
						</Link>

						<Link to="/" className='sideMenuOption'>
							Log Out 
							<i className="arrow right"></i>
						</Link>

					</div>

					<div className='spacer'>
						<Switch>
							<Route path="/my-account" children={<Accountrecipes />} />
							<Route path="/account-recipes" children={<Accountrecipes />} />
							<Route path="/change-password" children={<Changepassword />} />
							<Route path="/my-profile" children={<Myprofile />} />
							<Route path="/submit-recipe" children={<Submitrecipe />} />
						</Switch>
					</div>


				</div>
			</Router>
		);
	}
}


export default myAccountPage;