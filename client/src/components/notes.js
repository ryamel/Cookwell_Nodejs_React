import React, { Component } from "react";
import NoteElement from './noteElement';

const Notes = (props) => {
	if (props.notes.length < 1) {
		var notes = [''];
	} else {
		var notes = props.notes;
	}

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
				notes.map((note, index) => 
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