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
			searchResult: [],
			diet: [],
			cuisine: [],
			mealType: [],
			time: null,
			isLoaded: false
		}
		source = axios.CancelToken.source();
		this.handleInput = this.handleInput.bind(this);
		this.renderResults = this.renderResults.bind(this);
	}


	componentDidMount() {
		// this is only such that on reload / refresh, the component will still load some results
		let searchText = '';
		if (this.props.searchText) searchText = this.props.searchText;
		
		let body = {
			diet: this.state.diet,
	       	cuisine: this.state.cuisine,
	       	mealType: this.state.mealType,
	       	time: this.state.time,
	       	searchText: searchText
		};

		axios.post("/api/recipes/search", body, {cancelToken: source.token})
			.then(res => {
				//console.log(res.data);
				this.setState({
					searchResult: res.data,
					isLoaded: true
				})
			})
			.catch(err => {
				//console.log(err)
			});
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.searchClick !== prevProps.searchClick) {	

			let body2 = {
				diet: this.state.diet,
		       	cuisine: this.state.cuisine,
		       	mealType: this.state.mealType,
		       	time: this.state.time,
		       	searchText: this.props.searchText
			};

			axios.post("/api/recipes/search", body2, {cancelToken: source.token})
				.then(res => {
					this.setState({
						searchResult: res.data,
						isLoaded: true
					})
				})
				.catch(err => {
					//console.log(err)
				});
		}
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


	renderResults() {
		if (this.state.isLoaded) {
			if (this.state.searchResult.length > 0) {
				return <ShowResults results={this.state.searchResult} />
			} 
			if (this.state.searchResult.length == 0) {
				return <div id='noResultsMsg'>No results! Try another search</div>
			}
		}
	}


	render() {
		return (
			<React.Fragment>
				<div id="filter-container"> 
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


				{	this.renderResults()	}
				
			
			</React.Fragment>
		);
	}
}








export default Searchpage;



