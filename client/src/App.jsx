import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Switch, Route, Link } from "react-router-dom";

import Featured from './pages/featured';
import Recipes from './pages/recipes';
import Cooks from './pages/cooks';
import Recipepage from './pages/recipe-page';
import Searchpage from './pages/search-page';
import Loginpage from './pages/login-page';
import Signuppage from './pages/signup-page';
import Privacypolicypage from './pages/privacy-policy-page';
import Forgotpassword from './pages/forgot-password';
import Myaccountpage from './pages/my-account-page';

import './App.sass';
import mastHead from './media/brand/cookwell.png';
import mastHead_media from './media/brand/masthead_small.png';
import search_icon from './media/icons/searchicon.svg';
import login_icon from './media/icons/login.svg';




class App extends React.Component {
	constructor() {
		super();
		this.state = {
			logged_in: false,
			searchText: '',
			sendText: ''
		}

		this.textInput = React.createRef();
		this.login = this.login.bind(this);
		this.logBtn = this.logBtn.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.removeHeaderText = this.removeHeaderText.bind(this);
	}

	handleInput(text) {
		this.setState({searchText: text}, console.log(this.state));
	}

	componentDidMount() {
		localStorage['logged_in'] ? this.setState({logged_in: true}) : this.setState({logged_in: false})
	}

	login() { 
		this.setState({logged_in: true}); 
	}

	// logout() {
	// 	localStorage.removeItem('logged_in'); // remove local Storage
	// 	this.setState({logged_in: false}); // change state
	// }

	// onClick={() => this.logout()}

	removeHeaderText() {
		console.log('test');
		this.setState({searchText: 'test'}, console.log(this.state));
		// this.textInput.current.innerHTML('test');
	}

	logBtn(logged_in) {

		if (logged_in) {

			return (
				<Link to='/my-account'>
					<div id='loginBtn' >
						<img src={login_icon} />
						<span>
							My Account
						</span>
					</div>
				</Link>
			);

		} else {

			return (
				<Link to='/login-page'>
					<div id='loginBtn'>
						<img src={login_icon} />
						<span>
							Login
						</span>
					</div>
				</Link>
			);

		}
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


					{ this.logBtn(this.state.logged_in) } 
				
					
					<div className="headerSearchBar" >
						<input 
							placeholder="Search" 
							type="text" 
							name="input" 
							value={this.searchText}
							onChange={(e) => this.handleInput(e.target.value)}
						/>
						{/*<Link to="/search-page" >*/}
						<button className='searchBtn' type="submit" onClick={() => this.removeHeaderText()} >
							<img id="searchIcon" src={search_icon} alt='no-img' />
						</button>
						{/*</Link>*/}
				 	</div>

{/*				 	<div className="mediaSearchBar">
				 		<input 
				 			placeholder="Search" 
				 			type="text" 
				 			name="input" 
				 			value={this.searchText}
							onChange={(e) => this.handleInput(e.target.value)}
				 		/>
					 	<Link to="/search-page" >
							<button className='searchBtn' type="submit" name="submit-search">
								<img id="searchIcon-media" src={search_icon} alt='no-img' />
							</button>
						</Link>
			 		</div>*/}

				</div>


				{/*All pages to be used need to be listed under <Switch> as seen here. 
				Import each page as a component and place under a <Route> tag */}
				<Switch>
					<Route exact path="/" children={<Featured />} />
					<Route path="/recipes" children={<Recipes />} />
					<Route path="/cooks" children={<Cooks />} />
					<Route path="/recipe-page/:id" children={<Recipepage />} />
					<Route path="/search-page" children={<Searchpage searchText={' '} />} />
					<Route path="/login-page" children={<Loginpage login={this.login} />} />
					<Route path="/signup-page" children={<Signuppage />} />
					<Route path="/privacy-policy" children={<Privacypolicypage />} />
					<Route path="/forgot-password" children={<Forgotpassword />} />
					<Route path="/my-account" children={<Myaccountpage />} />
				</Switch>

			</Router>
		);
	}
}





export default App;







