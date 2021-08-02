import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import CookProfile from '../components/cookProfile';
import './author-page.sass';
import { withRouter } from "react-router"; 
import axios from 'axios';
import BrowseCard from '../components/browseCard';
import Footer from '../components/footer';

const AuthorPage = (props) => {
	const [userData, setUserData] = useState(null);
	const [recipeData, setRecipeData] = useState([]);
	const [loadFooter, setLoadFooter] = useState(false);
	
	useEffect(() => {
		document.body.style.backgroundColor = "white";
		let source = axios.CancelToken.source();
		const body = {authid: props.location.state.authid};

		axios.post('/api/users/getuserdata', body, {cancelToken: source.token})
			.then(res => {
				setUserData(res.data);
			})
			.catch(err => console.log(err));

		axios.post('/api/recipes/getuserrecipespublic', body, {cancelToken: source.token})
			.then(res => {
				setRecipeData(res.data);
				setLoadFooter(true);
			})
			.catch(err => console.log(err));

		return () => source.cancel();
	}, [])


	const renderImg = (img) => {
		if (img !== "") {
			return (
				<div id='img-wrapper'>
					<img src={process.env.PUBLIC_URL + '/user_profile_img/card/' + userData.profileImg} />
				</div>
			);
		} else {
			return null;
		}
	}

	if (!userData) {
		return null;
	} else {
		return (
			<div id="cookBody">
				<div id='profile-container'>
					{	renderImg(userData.profileImg)	}
					<div id='profile-info-container'>
						<div id='authName'>Name Here</div>
						<div id='authAbout'>Lorem ipsum about serum norpy surnlimg tupe of</div>
					</div>
				</div>
				<div id='divider'></div>
				<div className='recipe-grid-container'>
					{
						recipeData.map((cardData, index) => 
							<BrowseCard 
								key={index} 
								img={cardData.img} 
								description={cardData.description} 
								author={cardData.authid.name} 
								aId={cardData.authid._id} 
								index={index} 
								edit={false}
								rtitle={cardData.title}
								/>	
						)
					}
				</div>

			<Footer isLoaded={loadFooter} />
			</div>
		);
	}
};


export default withRouter(AuthorPage);