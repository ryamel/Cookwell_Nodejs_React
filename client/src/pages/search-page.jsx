import React, { Component } from "react";
import './search-page.sass';
import DropMenu from '../components/dropMenu';
import DietMenu from '../components/dietMenu';
import { mealTypes, dietOptions, cuisine } from './searchOptions';
import ShowResults from './show-results'


class Searchpage extends React.Component {

	constructor() {
		super();
		this.state = {
			show: false,
			results: [],
			isLoaded: false,
			error: false,
			searchText: '',
			diet: [],
			cuisine: [],
			mealType: [],
			time: null
		}

		this.searchFunction = this.searchFunction.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}


	componentDidMount() {
		// on load search for random results
		const postOptions = {
	        method: 'POST',
	        headers: { 'Content-Type': 'application/json' },
	        body: JSON.stringify({})
	    };

		fetch("/api/recipes/search/1", postOptions)
			.then(res => res.json())
			.then(
				(data) => {
					console.log(data);
					this.setState({
						results: data,
						isLoaded: true
					})
				},
				(error) => {
					console.log('error');
					this.setState({
						isLoaded: false,
						error: error
					})
				}
			)
	}


	handleInput(event) {

		var stateName = event.target.name;


		// if time selection
		if (stateName == 'time') {
			var input = event.target.value;
			if (this.state.time === event.target.value) {
				this.setState({
					[stateName]: null
				});
			} else {
				this.setState({
					[stateName]: input
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
			if (newState.includes(event.target.value)) {
				const index = newState.indexOf(event.target.value);
				newState.splice(index, 1);
			} else {
				newState.push(event.target.value);
			}

			this.setState({
				[stateName]: newState
			}, console.log(this.state));
		}


		// if searchText
		if (stateName == 'searchText') {
			this.setState({
				[stateName]: event.target.value
			});
		}
		

	}

	searchFunction(input) {

		const data = {
			diet: this.state.diet,
	       	cuisine: this.state.cuisine,
	       	mealType: this.state.mealType,
	       	time: this.state.time,
	       	searchText: this.state.searchText
		};

		const postOptions = {
	        method: 'POST',
	        headers: { 'Content-Type': 'application/json' },
	        body: JSON.stringify(data)
	    };

	    	   
		fetch("/api/recipes/search/0", postOptions)
			.then(res => res.json())
			.then(
				(data) => {
					console.log(data);
					this.setState({
						results: data,
						isLoaded: true,
						error: false
					})
				},
				(error) => {
					console.log('error');
					this.setState({
						isLoaded: false,
						error: error
					})
				}
			)
	}


	render() {

		return (
			<React.Fragment>

				<div id="filter-container"> 

						<div id="filterSearchContainer">
							<input 
								placeholder="Keywords" 
								type="text" 
								name="searchText" 
								value={this.state.searchText}
								onChange={this.handleInput} 
							/>
							<button onClick={this.searchFunction} className="searchBtn" type="submit">Search</button>
						</div>



						<div id="restrictions-body">

							<div className="filterDivs">
								<DietMenu 
									dietOptions={dietOptions}
									handleInput={this.handleInput}
									state={this.state.diet}
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
										onChange={this.handleInput}
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
										onChange={this.handleInput} 
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
										onChange={this.handleInput}
									/>
									<span className="checkmark"></span>
								</label> 
							</div>



							<div className="filterDivs">
								<span className='restriction-label dropMenu-label'>Culinary</span>
								<DropMenu 
									stateName='cuisine'
									options={cuisine} 
									handleInput = {this.handleInput}
									state={this.state.cuisine}
								/>
							</div>


							<div className="filterDivs">
								<span className='restriction-label dropMenu-label'>Meal Type</span>
								<DropMenu 
									stateName='mealType'
									options={mealTypes} 
									handleInput = {this.handleInput}
									state={this.state.mealType}
								/>
							</div>

						</div>
					
				</div>



				<ShowResults isLoaded={this.state.isLoaded} error={this.state.error} results={this.state.results} />
			

			</React.Fragment>
		);
	}
}




// function renderResults(searchTerm) {

// 	const { error, isLoaded } = this.state;

// 	if (error) {
// 		return <div>Error: {error.message}</div>;
// 	} else if (!isLoaded) {
// 		return <div>Loading...</div>;
// 	} else {


// 	const { results } = this.state;
// 	return;

// 	}
// }





export default Searchpage;



