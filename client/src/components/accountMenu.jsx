import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Switch, Route, Link } from "react-router-dom";
import './accountMenu.sass';

import Accountrecipes_page from "../pages/account-pages/account-recipes-page";
import Changepassword_page from "../pages/account-pages/change-password-page";
import Myprofile_page from "../pages/account-pages/my-profile-page";
import Submitrecipe_page from "../pages/account-pages/submit-recipe-page";



const accountMenu = () => {




	return (
		<React.Fragment>

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
					Account
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

			<Switch>
				<Route path="/account-recipes" children={<Accountrecipes_page />} />
				<Route path="/change-password" children={<Changepassword_page />} />
				<Route path="/my-profile" children={<Myprofile_page />} />
				<Route path="/submit-recipe" children={<Submitrecipe_page />} />
			</Switch>

		</React.Fragment>
	);
}





export default accountMenu;





