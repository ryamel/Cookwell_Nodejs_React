import React, { Component } from "react";
import BrowseCard from '../components/browseCard';
import './recipes.sass';
import Footer from '../components/footer';
import axios from 'axios';
let source;
// added task. Pagination using random recipes.


class Recipes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cardData: [],
			isLoaded: false,
			loadFooter: false,
			atBottom: false,
			height: window.innerHeight,
			skip: 0,
			limit: 20
		}
		source = axios.CancelToken.source();
		this.handleScroll = this.handleScroll.bind(this);
		this.loadMoreRecipes = this.loadMoreRecipes.bind(this);
	}

	componentDidMount() {
		window.addEventListener("scroll", this.handleScroll);
		
		axios.get("/api/recipes/page/0/" + this.state.limit, {cancelToken: source.token})
			.then(res => {
					this.setState(prevState => ({
						cardData: res.data,
						isLoaded: true,
						loadFooter: true,
						skip: prevState.skip + prevState.limit
					}));
				}
			)
	}

	loadMoreRecipes() { 
		axios.get("/api/recipes/page/" + this.state.skip + "/" + this.state.limit, {cancelToken: source.token})
			.then(res => {
					this.setState(prevState => ({
						cardData: prevState.cardData.concat(res.data),
						skip: prevState.skip + prevState.limit
					}), console.log(this.state.cardData));
				}
			)
	}

	componentWillUnmount() {
		if (source) source.cancel();
	    window.removeEventListener("scroll", this.handleScroll);
	}


	handleScroll() {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight ) {
            console.log('bottom');
            this.loadMoreRecipes();
        }
    }


	render() {
		const {isLoaded } = this.state;

		if (!isLoaded) {
			return null;
		} else {
			const { cardData } = this.state;
			//console.log(cardData)
			return (
				<div className='browse-body'>
					<div className='recipe-grid-container' >
						{cardData.map((card, index) => 
							<BrowseCard 
								key={index} 
								img={card.img} 
								description={card.description} 
								author={card.authid.name} 
								aId={card.authid._id} 
								rtitle={card.title} 
								index={index} 
								edit={false}
								/>	
						)}
					</div>
					{/*<Footer isLoaded={this.state.loadFooter} />*/}
				</div>
			);
		}
	}
}






export default Recipes;