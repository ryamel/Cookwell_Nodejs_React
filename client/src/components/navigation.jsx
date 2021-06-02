import React from "react";
import { NavLink, Switch, Route } from 'react-router-dom';
import Recipes from '../pages/recipes'
import Featured from '../pages/featured'
import Cooks from '../pages/cooks'


const Navigation = () => (
	<div>

		<nav id='navBar-container'>
			<NavLink to="/">FEATURED</NavLink>
	  		<NavLink to="/recipes">RECIPES</NavLink>
	  		<NavLink to="/cooks">COOKS</NavLink>
		</nav>

		<Switch>
	        <Route exact path='/' component={Featured}></Route>
	        <Route exact path='/recipes' component={Recipes}></Route>
	        <Route exact path='/cooks' component={Cooks}></Route>
	    </Switch>

    </div>
);


export default Navigation;