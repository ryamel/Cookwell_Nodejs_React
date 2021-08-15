import React, { Component, useState, useEffect } from "react";
import BrowseCard from '../components/browseCard';
import './review-page.sass';
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";
import ContactForm from '../components/contactForm';
let source;


const ReviewPage = () => {
	const [data, setData] = useState(null);
	const [render, setRender] = useState(1);
	const [openMail, setOpenMail] = useState(false);
	const [openMail_rid, setOpenMail_rid] = useState(false);
	const [openMail_authid, setOpenMail_authid] = useState(false);
	const [openMail_rtitle, setOpenMail_rtitle] = useState(false);
	const [errMsg, setErrMsg] = useState('');
	let history = useHistory();

	useEffect(() => {
		let source = axios.CancelToken.source();

		axios.get('/api/recipes/getreview', {cancelToken: source.token})
			.then(res => {
				//console.log(res.data);
				setData(res.data);
			})
			.catch(err => {
				history.push('/');
			});

		return () => source.cancel();
	}, [render])


	const approveRecipe = (rid) => {

		const body = { rid: rid };

		axios.post('/api/recipes/approve', body)
			.then(res => {
				//console.log('return');
				setRender(render + 1);
			})
			.catch(err => {
				//console.log(err)
			});
	}

	const openEmail = (rid, authid, rtitle) => {
		setOpenMail(true);
		setOpenMail_rid(rid);
		setOpenMail_authid(authid);
		setOpenMail_rtitle(rtitle);
	}

	const handleError = (errMsg) => {
		if (errMsg.length > 0) {
			setErrMsg(errMsg);
			const timer = setTimeout(() => {
				setErrMsg('');
			}, 5500);
		}
	}

	if (!data) {
		return null;
	} else {
		return (
			<React.Fragment>
				{	errMsg.length > 0 && <div className='bannerMsgBar'>{errMsg}</div>	}
				<div id="review-container">
					<table id="rev-table">
						<thead>
							<tr>
								<th id="title-auth">Author / User</th>
								<th id="title-recipe">Recipe</th>
								<th id="title-date">Uploaded (YY/DD/MM)</th>
								<th id="title-approve">Approve Recipe</th>
								<th id="title-contact">Contact Author</th>
								<th id="title-sentEmail">Sent Email</th>
							</tr>
						</thead>
						<tbody>
							{	data.length > 0 &&
								data.map((recipe, index) => {
									return (
										<tr key={index}>
											<td> {recipe.authid.name}</td>
											<td> <Link to={{pathname: process.env.PUBLIC_URL + '/recipe-page/?rtitle=' + recipe.title}}>{recipe.title}</Link> </td>
											<td> {recipe.uploadDate.slice(0, 10)} </td>
											<td> <button onClick={() => approveRecipe(recipe._id) }>Approve</button> </td>
											<td> <button onClick={() => openEmail(recipe._id, recipe.authid, recipe.title) }>Send Email</button> </td>
											<td> {recipe.contactedAuthor ?  'Awaiting response' : 'No message sent'} </td>
										</tr>
									);
								})
							}
					  	</tbody>
					</table>
						{	data.length < 1 && <div id='noData'>No recipes for review</div>		}		
				</div>
					{	openMail && 
							<ContactForm 
								authid={openMail_authid}
								rid={openMail_rid}
								rtitle={openMail_rtitle}
								handleError={handleError}
								setOpenMail={setOpenMail} 
								/>	
					}

			</React.Fragment>
		);
	}
}

// need to close email window after send, and reset openMail to false








export default ReviewPage;


