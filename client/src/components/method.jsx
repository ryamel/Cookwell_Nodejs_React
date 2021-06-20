import React from 'react';
import MethodElement from './methodElement';


function Method(props) {

	return(
		<div id="dynamic_method">

			<div className="std-field-label form-title-inline ingrMethNoteTitle">
				Steps / Method
				<span className="requiredStar"> *</span>
			</div>

			<div id="addRemoveBtn-container">
				<button id="add_methodField" onClick={() => props.addField('method')} type="button">Add Entry</button>
				<button id="remove_methodField" onClick={() => props.removeField('method')} type="button">Remove Last</button>
			</div>
			{
				props.methods.map((method, index) =>
					<MethodElement 
						key={index}
						number={index}
						method={method}
						handleInput={props.handleInput}
						/>
				)
			}
		</div>
	);
	
}


export default Method;