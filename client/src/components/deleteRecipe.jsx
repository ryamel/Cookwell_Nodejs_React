import React, { useState } from 'react';
import { Redirect } from 'react-router'
import './deleteRecipe.sass';
import axios from 'axios';

const DeleteRecipe = (props) => {
	const [display, setDisplay] = useState('hidden');

	const deleteRecipe = (setDisplay) => {
		let body = JSON.stringify({rid: props.rid});
		axios.post('/api/recipes/deleterecipe', body, { headers: { 'Content-Type': 'application/json' } } )
			.then(res => {
				props.redirect();
			})
			.catch(err => console.log(err));
	}

	if (!props.edit) {
		return null;
	} else {
		return (
			<React.Fragment>    
			    <div id='overlayDelete' style={{display: display}}></div>

	    		<button type='submit' name='deleteSubmit' id='deleteRecipe' onClick={() => setDisplay('block')} >
	    			Delete Recipe
	    		</button>

	    		<div id='DeleteForm' style={{display: display}}>
					<p>Are you sure you want to delete {props.title}? <br/> ( this cannot be undone )</p>
					<div>
						<input type='hidden' name='rls' value='' autoComplete='off' />
						<button type='submit' name='confirmDelete' onClick={() => deleteRecipe()}>Delete</button>
						<button type='button' onClick={() => setDisplay('none')} >Back</button>
					</div>						
				</div>
	    	</React.Fragment>
		);
	} 
}




export default DeleteRecipe;