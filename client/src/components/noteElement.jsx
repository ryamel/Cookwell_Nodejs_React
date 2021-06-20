import React, {Component} from "react";
import { units } from '../searchOptions';


function NoteElement(props) {

	return (
        <div className='field-container-add'>
        	<input 
        		className='noteNum' 
        		name='stepNum' 
        		placeholder='Step #' 
        		value={props.note.stepNum}
        		onChange={(e) => props.handleInput(e.target.name, e.target.value, props.number)}
        	/>
        	<input 
        		className='noteInput' 
        		name='note' 
        		placeholder='Note to be attached to Step' 
        		value={props.note.text}
        		onChange={(e) => props.handleInput(e.target.name, e.target.value, props.number)}
        	/>
        </div>
	);


}



export default NoteElement;