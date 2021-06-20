import React, {Component} from "react";
import { units } from '../searchOptions';
import NoteElement from './noteElement';

function Notes(props) {

	return (

        <div id='dynamic_notes'>

			<div className='std-field-label form-title-inline ingrMethNoteTitle'>
				Notes
			</div>

			<div id="addRemoveBtn-container">
				<button id="add_noteField" type="button" onClick={() => props.addField('notes')} >Add Entry</button>
				<button id="remove_noteField" type="button" onClick={() => props.removeField('notes')}>Remove Last</button>
			</div>
			{
				props.notes.map((note, index) => 
					<NoteElement 
						key={index}
						number={index}
						note={note}
						handleInput={props.handleInput}
						/>
					)
			}

        </div>
	);
	
}


export default Notes;