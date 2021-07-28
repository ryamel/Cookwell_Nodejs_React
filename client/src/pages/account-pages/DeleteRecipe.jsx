import React, { useState } from 'react';
import { Redirect } from 'react-router'
import './deleteRecipe.sass';

const DeleteRecipe = (props) => {
	const [display, setDisplay] = useState('hidden');
	const [redirect, setRedirect] = useState(false);

	if (redirect) {
		return <Redirect to={{pathname: "/my-account", search: "?msg=recipe-deleted"}} />;
	}

	if (!props.edit) {
		return null;
	} else {
		return (
			<React.Fragment>    
			    <div id='overlayDelete' style={{display: display}}></div>

	    		<button type='submit' name='deleteSubmit' id='deleteRecipe' onClick={() => setDisplay('block')} >Delete Recipe</button>
	    		<div id='DeleteForm' style={{display: display}}>
					<p>Are you sure you want to delete {props.title}? <br/> ( this cannot be undone )</p>
					<div>
						<input type='hidden' name='rls' value='' autoComplete='off' />
						<button type='submit' name='confirmDelete' onClick={() => deleteRecipe(props.title, setDisplay, setRedirect)} >Delete</button>
						<button type='button' onClick={() => setDisplay('none')} >Back</button>
					</div>						
				</div>



	    	</React.Fragment>
		);
	} 
}

function deleteRecipe(title, setDisplay, setRedirect){
	// setDisplay('none');

	fetch('/api/recipes/deleterecipe', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({title: title})
	})
	.then(res => res.json())
	.then(data => {
		setRedirect(true);
	})
	.catch(err => console.log(err));
}


export default DeleteRecipe;