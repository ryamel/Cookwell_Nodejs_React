import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Switch, Route, Link } from "react-router-dom";

import Featured from './pages/featured';
import Recipes from './pages/recipes';
import Cooks from './pages/cooks';
import Recipepage from './pages/recipe-page';

import './App.sass';
import mastHead from './media/brand/cookwell.png';
import mastHead_media from './media/brand/masthead_small.png';
import search_icon from './media/icons/searchicon.svg';


class App extends Component {
	state = {
		logIn: 0
	}
	render() {
		return (
			<Router>

				<div id='headerBody'>

					<Link to="/" id="mast">
						<img src={mastHead} alt='noimg' />
					</Link>

					<Link to="/" id="mast-media">
						<img src={mastHead_media} alt='no-img' />
					</Link>

					<nav id='navBar-container'>
						<NavLink to="/">FEATURED</NavLink>
				  		<NavLink to="/recipes">RECIPES</NavLink>
				  		<NavLink to="/cooks">COOKS</NavLink>
					</nav>

					<div className="headerSearchBar">
						<form action="search" method="GET">
							<input placeholder="Search" type="text" name="input" />
							<button className='searchBtn' type="submit">
								<img id="searchIcon" src={search_icon} alt='no-img' />
							</button>
						</form>
				 	</div>

				 	<div className="mediaSearchBar">
						<form action="search" method="GET">
							<button className='searchBtn' type="submit" name="submit-search">
								<img id="searchIcon-media" src={search_icon} alt='no-img' />
							</button>
							<input placeholder="Search" type="text" name="input" />
						</form>
			 		</div>

				</div>


				{/*All pages to be used need to be listed under <Switch> as seen here. 
				Import each page as a component and place under a <Route> tag */}
				<Switch>
					<Route exact path="/" children={<Featured />} />
					<Route path="/recipes" children={<Recipes />} />
					<Route path="/cooks" children={<Cooks />} />
					<Route path="/recipe-page/:id" children={<Recipepage />} />
				</Switch>

			</Router>
		);
	}
}

export default App;




