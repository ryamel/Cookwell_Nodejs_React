import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Switch, Route, Link, Redirect} from "react-router-dom";
import axios from 'axios';
import PropTypes from "prop-types"; // needed location history match
import { withRouter } from "react-router"; // needed location history match

import Featured from './pages/featured';
import Recipes from './pages/recipes';
import Authorpage from './pages/author-page';
import Recipepage from './pages/recipe-page';
import Searchpage from './pages/search-page';
import Loginpage from './pages/login-page';
import Signuppage from './pages/signup-page';
import Privacypolicypage from './pages/privacy-policy-page';
import Forgotpassword from './pages/forgot-password';
import Myaccountpage from './pages/my-account-page';
import ResetPassword from './pages/reset-password';
import ReviewPage from './pages/review-page';
import FAQ from './pages/faq';
import Contact from './pages/contact';

import './App.sass';
import mastHead from './media/brand/cookwell.png';
import mastHead_media from './media/brand/masthead_small.png';
import search_icon from './media/icons/search_icon.svg';



class App extends React.Component {
	constructor(props) {
		super();
		this.state = {
			logged_in: false,
			searchText: '',
			redirect: false,
			search: false,
			style: null
		}

		this.textInput = React.createRef();
		this.login = this.login.bind(this);
		this.logBtn = this.logBtn.bind(this);
		this.logout = this.logout.bind(this);
		this.searchClick = this.searchClick.bind(this);
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
		localStorage.removeItem('logged_in'); // remove local Storage
		this.setState({logged_in: false}); 
	}

	searchClick(){
		this.setState({search: !this.state.search}); // let search-page component know search button was clicked
		this.props.history.push('/search-page');
	}


	logBtn() {
		if (this.state.logged_in) {
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



	render() {
		let { featHeader, recipeHeader, stickyHeader } = '';
		let currentURL = window.location.pathname;
		if (currentURL == '/') featHeader = 'underLine';
		if (currentURL == '/recipes') {
			recipeHeader = 'underLine';
			stickyHeader = 'stickyHeader';
		}
		
		return (
			<div id='main'>
				<div id='headerBody' className={stickyHeader}>

					<Link to="/" id="mast">
						<img src={mastHead} alt='noimg' />
					</Link>

					<div id='navDiv'>
						<NavLink className='feat' to="/">
							FEATURED
							<div className={featHeader}></div>
						</NavLink>
					  	<NavLink className='rec' to="/recipes">
					  		RECIPES
					  		<div className={recipeHeader}></div>
					  	</NavLink>
					</div>
					
					{	this.logBtn()	} 

					<div className="headerSearchBar" >
						<input 
							placeholder="Search" 
							type="text" 
							name="search" 
							value={this.state.searchText}
							onKeyUp={(e) => e.keyCode === 13 ? this.searchClick() : null }
							onChange={(e) => this.setState({searchText: e.target.value})}
							/>
						<Link to='/search-page'>
							<button id='searchBtn' type="submit" onClick={(e) => this.searchClick()} >
								<img id="searchIcon" src={search_icon} alt='no-img' />
							</button>
						</Link>
				 	</div>

				</div>


				{/*All pages to be used need to be listed under <Switch> as seen here. Import each page as a component and place under a <Route> tag */}
				<Switch>
					<Route exact path="/"> 				<Featured /> 											</Route>
					<Route exact path="/recipes"> 		<Recipes /> 											</Route>
					<Route path="/author"> 				<Authorpage /> 											</Route>
					<Route path="/recipe-page"> 		<Recipepage /> 											</Route>
					<Route path="/search-page"> 		<Searchpage 
															searchText={this.state.searchText} 
															searchClick={this.state.search}
															/> 													</Route>
					<Route path="/login-page"> 			<Loginpage login={this.login} /> 						</Route>
					<Route path="/signup-page"> 		<Signuppage login={this.login}/> 						</Route>
					<Route path="/privacy-policy"> 		<Privacypolicypage /> 									</Route>
					<Route path="/forgot-password"> 	<Forgotpassword /> 										</Route>
					<Route path="/my-account"> 			<Myaccountpage logout={this.logout} /> 					</Route>
					<Route path="/reset-password"> 		<ResetPassword /> 										</Route>
					<Route path="/review"> 				<ReviewPage /> 											</Route>
					<Route path="/faq"> 				<FAQ /> 												</Route>
					<Route path="/contact"> 			<Contact /> 											</Route>
				</Switch>

			</div>
		);
	}
}



export default withRouter(App);







