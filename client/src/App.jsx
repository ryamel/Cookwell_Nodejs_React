import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Switch, Route, Link, Redirect} from "react-router-dom";
import axios from 'axios';
import PropTypes from "prop-types"; // needed location history match
import { withRouter } from "react-router"; // needed location history match

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
import ResetPassword from './pages/reset-password';
import ReviewPage from './pages/review-page';

import './App.sass';
import mastHead from './media/brand/cookwell.png';
import mastHead_media from './media/brand/masthead_small.png';
import search_icon from './media/icons/searchicon.svg';
import login_icon from './media/icons/login.svg';




class App extends React.Component {
	constructor(props) {
		super();
		this.state = {
			logged_in: false,
			search: '',
			redirect: false,
			searchBtn: false,
			style: null
		}

		this.textInput = React.createRef();
		this.login = this.login.bind(this);
		this.logBtn = this.logBtn.bind(this);
		this.logout = this.logout.bind(this);
		this.setSearchBtn = this.setSearchBtn.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
	}

	static propTypes = {
	    match: PropTypes.object.isRequired,
	    location: PropTypes.object.isRequired,
	    history: PropTypes.object.isRequired
 	};

	componentDidMount() {
		localStorage['logged_in'] ? this.setState({logged_in: true}) : this.setState({logged_in: false})// check for jwt. then render appropriate log status

	}

	login() { 
		this.setState({logged_in: true}); 
	}

	logout() {
		// 	localStorage.removeItem('logged_in'); // remove local Storage
		this.setState({logged_in: false}); 
	}

	setSearchBtn(){
		this.setState({searchBtn: !this.state.searchBtn});
	}


	logBtn(logged_in) {
		if (logged_in) {
			return (
				<Link to='/my-account'>
					<div id='loginBtn' >
						<img src={login_icon} />
						<span>Account</span>
					</div>
				</Link>
			);
		} else {
			return (
				<Link to='/login-page'>
					<div id='loginBtn'>
						<img src={login_icon} />
						<span>Login</span>
					</div>
				</Link>
			);
		}
	}


	handleKeyUp(event) {
		if (event.keyCode === 13) {
			const { match, location, history } = this.props;
			this.setSearchBtn();
			history.push('/search-page');
		}

	}


	render() {
		// // detect
		// window.location.pathname
		// let feature = null;
		// let recipe = 'underline';
		// let cooks = null;

		// const { match, location, history } = this.props;
		// console.log('match');
		// console.log(match);
		// console.log('location');
		// console.log(location);
		// console.log('history');
		// console.log(history);
		// history.push('/cooks');

		return (
			<div>

				<div id='headerBody'>

					<Link to="/" id="mast">
						<img src={mastHead} alt='noimg' />
					</Link>

					<nav id='navBar-container'>
						<NavLink  to="/">FEATURED</NavLink>
				  		<NavLink  to="/recipes">RECIPES</NavLink>
				  		<NavLink  to="/cooks">COOKS</NavLink>
					</nav>				
					
					<div className="headerSearchBar" >
						<input 
							placeholder="Search" 
							type="text" 
							name="search" 
							value={this.search}
							onKeyUp={(e) => this.handleKeyUp(e)}
							onChange={(e) => this.setState({search: e.target.value}, console.log(this.state.search))}
							/>
							<Link to='/search-page'>
								<button className='searchBtn' type="submit" onClick={(e) => this.setSearchBtn()} >
									<img id="searchIcon" src={search_icon} alt='no-img' />
								</button>
							</Link>
				 	</div>

				 	{ this.logBtn(this.state.logged_in) } 



				 	{/*					
					 	<Link to="/" id="mast-media">
							<img src={mastHead_media} alt='no-img' />
						</Link>
					*/}

			{/*		<div className="mediaSearchBar">
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


				{/*All pages to be used need to be listed under <Switch> as seen here. Import each page as a component and place under a <Route> tag */}
				<Switch>
					<Route exact path="/"> 				<Featured /> 											</Route>
					<Route path="/recipes"> 			<Recipes /> 											</Route>
					<Route path="/cooks"> 				<Cooks /> 												</Route>
					<Route path="/recipe-page/:id"> 	<Recipepage /> 											</Route>
					<Route path="/search-page"> 		<Searchpage 
															search={this.state.search} 
															setSearchBtn={this.setSearchBtn} 
															searchBtn={this.state.searchBtn}
															/> 													</Route>
					<Route path="/login-page"> 			<Loginpage login={this.login} /> 						</Route>
					<Route path="/signup-page"> 		<Signuppage login={this.login}/> 						</Route>
					<Route path="/privacy-policy"> 		<Privacypolicypage /> 									</Route>
					<Route path="/forgot-password"> 	<Forgotpassword /> 										</Route>
					<Route path="/my-account"> 			<Myaccountpage logout={this.logout} /> 					</Route>
					<Route path="/reset-password"> 		<ResetPassword /> 										</Route>
					<Route path="/review"> 				<ReviewPage /> 											</Route>
				</Switch>

			</div>
		);
	}
}



export default withRouter(App);







