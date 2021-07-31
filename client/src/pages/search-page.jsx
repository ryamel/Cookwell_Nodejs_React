import React, { Component } from "react";
import './search-page.sass';
import DropMenu from '../components/dropMenu';
import MultiSelectMenu from '../components/multiSelectMenu';
import { mealTypes, dietOptions, cuisine } from '../searchOptions';
import ShowResults from '../components/show-results'
import axios from 'axios';
let source;

class Searchpage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
			searchResult: [],
			isLoaded: false,
			error: false,
			diet: [],
			cuisine: [],
			mealType: [],
			time: null,
			emtyResult: false
		}
		source = axios.CancelToken.source();
		this.handleSearch = this.handleSearch.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}


	componentDidMount() {
		// this is only such that on reload / refresh, the component will still load some results
		if (!this.props.searchBtn) {
			let body = {
				diet: this.state.diet,
		       	cuisine: this.state.cuisine,
		       	mealType: this.state.mealType,
		       	time: this.state.time,
		       	searchText: this.props.search
			};

			axios.post("/api/recipes/search", body, {cancelToken: source.token})
				.then(res => {
					this.setState({
						searchResult: res.data,
						isLoaded: true
					})
				})
				.catch(err => console.log(err));
		}
	}

	handleSearch() {
	
		this.props.setSearchBtn(); // reset search btn to false
		
		let body2 = {
			diet: this.state.diet,
	       	cuisine: this.state.cuisine,
	       	mealType: this.state.mealType,
	       	time: this.state.time,
	       	searchText: this.props.search
		};

		axios.post("/api/recipes/search", body2, {cancelToken: source.token})
			.then(res => {
				res.data.length < 1 ? this.setState({emtyResult: true}) : this.setState({emtyResult: false});
				this.setState({
					searchResult: res.data,
					isLoaded: true
				})
			})
			.catch(err => console.log(err));
	}


	handleInput(stateName, value) {

		// if time selection
		if (stateName == 'time') {
			if (this.state.time === value) {
				this.setState({
					[stateName]: null
				});
			} else {
				this.setState({
					[stateName]: value
				});
			}
			return;
		}
		

		// if diet, mealType, or cuisine selection. Check if selection exists in state.diet array. If aleady exists, remove it. If it doesnt, append it to the state.diet
		if (stateName == 'diet') {
			var newState = this.state.diet;
			var cont = 1;
		} else if (stateName == 'cuisine') {
			var newState = this.state.cuisine;
			var cont = 1;
		} else if (stateName == 'mealType') {
			var newState = this.state.mealType;
			var cont = 1;
		}
		if (cont) {
			if (newState.includes(value)) {
				const index = newState.indexOf(value);
				newState.splice(index, 1);
			} else {
				newState.push(value);
			}

			this.setState({
				[stateName]: newState
			});
		}


		// if searchText
		if (stateName == 'searchText') {
			this.setState({
				[stateName]: value
			});
		}
		
	}
	
	componentWillUnmount() {
		if (source) source.cancel();
	}




	render() {
		// handles behaviour
		if (this.props.searchBtn) this.handleSearch();

		return (
			<React.Fragment>

				<div id="filter-container"> 

{/*						<div id="filterSearchContainer">
							<input 
								placeholder="Keywords" 
								type="text" 
								name="searchText" 
								value={this.state.searchText}
								onChange={(e) => this.handleInput(e.target.name, e.target.value)} 
							/>
							<button onClick={this.searchFunction} className="searchBtn" type="submit">Search</button>
						</div>*/}



						<div id="restrictions-body">

							<div className="filterDivs">
								<span className='restriction-label'>Dietary</span>
								<MultiSelectMenu 
									name='diet'
									options={dietOptions}
									state={this.state.diet}
									handleInput={(e) => this.handleInput(e.target.name, e.target.value)}
								/>
							</div>



							<div className="filterDivs">
					 			<span className='restriction-label'>Time</span>
								<label className="check-container"> 
									<span className='lt-sym'>&lt;</span> 30 min
									<input 
										name="time" 
										value='30' 
										type="checkbox"
										checked={this.state.time === "30"} 
										onChange={(e) => this.handleInput(e.target.name, e.target.value)}
									/>
									<span className="checkmark"></span>
								</label>
								<label className="check-container"> 
									<span className='lt-sym'>&lt;</span> 45 min
									<input 
										name="time" 
										value="45" 
										type="checkbox"
										checked={this.state.time === "45"}
										onChange={(e) => this.handleInput(e.target.name, e.target.value)} 
									/>
									<span className="checkmark"></span>
								</label>
								<label className="check-container"> 
									<span className='lt-sym'>&lt;</span> 60 min
									<input 
										name="time" 
										value="60" 
										type="checkbox"
										checked={this.state.time === "60"} 
										onChange={(e) => this.handleInput(e.target.name, e.target.value)}
									/>
									<span className="checkmark"></span>
								</label> 
							</div>



							<div className="filterDivs">
								<span className='restriction-label dropMenu-label'>Culinary</span>
								<DropMenu 
									name='cuisine'
									options={cuisine} 
									handleInput = {(e) => this.handleInput(e.target.name, e.target.value)}
									state={this.state.cuisine}
								/>
							</div>


							<div className="filterDivs">
								<span className='restriction-label dropMenu-label'>Meal Type</span>
								<DropMenu 
									name='mealType'
									options={mealTypes} 
									handleInput = {(e) => this.handleInput(e.target.name, e.target.value)}
									state={this.state.mealType}
								/>
							</div>

						</div>
					
				</div>



				{
					!this.state.emtyResult ? 
					<ShowResults results={this.state.searchResult} />  : 
					<div id='noResultsMsg'>No results! Try another search</div>
				}
				
			

			</React.Fragment>
		);
	}
}








export default Searchpage;



