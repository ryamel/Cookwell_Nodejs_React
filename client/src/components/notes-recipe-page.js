import React, { Component } from 'react';


const Notes = (props) => {

	if (props.notes.length < 1) {
		return null;
	} else {
		return (
			<div id='rec-container-4'>
				<div className='rec-container-headings' id='note-title'>
					NOTES
				</div>
				<div className='note-container'>
					<ul>
						{props.notes.map((note, index) => (
							<li key={index}>
								<span className='note'> {note}</span>
							</li>
						))}	
					</ul>
				</div>
			</div>
		);
	}
}


export default Notes;