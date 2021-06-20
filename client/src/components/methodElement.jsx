import React from 'react';



function MethodElement(props) {

	return(
		<div className='field-container-add'>
	    	<textarea 
		    	name='method' 
		    	rows='4' 
		    	cols='98' 
		    	placeholder={`Step ${props.number + 1}`} 
		    	value={props.method}
		    	onChange={(e) => props.handleInput(e.target.name, e.target.value, props.number)}
	    		>	
	    	</textarea>
	    </div>
	);
	
}


export default MethodElement;