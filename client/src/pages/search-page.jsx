import React, { Component } from "react";
import './search-page.sass';
import DropMenu from '../components/dropMenu';
import MultiSelectMenu from '../components/multiSelectMenu';
import { mealTypes, dietOptions, cuisine } from '../searchOptions';
import ShowResults from './show-results'


class Searchpage extends React.Component {

	constructor(props) {
		super(props);
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

		this.setState({searchText: this.props.searchText});

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


	handleInput(stateName, value) {

		// console.log(stateName, value);

		// var stateName = event.target.name;


		// if time selection
		if (stateName == 'time') {
			if (this.state.time === value) {
				this.setState({
					[stateName]: null
				},console.log(this.state.time));
			} else {
				this.setState({
					[stateName]: value
				},console.log(this.state.time));
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
			}, console.log(this.state));
		}


		// if searchText
		if (stateName == 'searchText') {
			this.setState({
				[stateName]: value
			}, console.log(this.state.searchText));
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
								onChange={(e) => this.handleInput(e.target.name, e.target.value)} 
							/>
							<button onClick={this.searchFunction} className="searchBtn" type="submit">Search</button>
						</div>



						<div id="restrictions-body">

							<div className="filterDivs">
								<span className='restriction-label'>Dietary</span>
								<MultiSelectMenu 
									name='diet'
									options={dietOptions}
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



				<ShowResults isLoaded={this.state.isLoaded} error={this.state.error} results={this.state.results} />
			

			</React.Fragment>
		);
	}
}








export default Searchpage;



