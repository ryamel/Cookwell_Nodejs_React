import React, {Component} from "react";
import { units } from '../searchOptions';


const NoteElement = (props) => {
	return (
                <div className='field-container-add'>
                	<input 
                		className='noteInput' 
                		name='text' 
                		placeholder='Add note' 
                		value={props.note}
                		onChange={(e) => props.handleInput(e.target.name, e.target.value, props.number)}
                	/>
                </div>
	);
}



export default NoteElement;