import React, {Component} from "react";
import { units } from '../searchOptions';
import IngredientElement from './ingredientElement';

function Ingredients(props) {
	return (
		<React.Fragment>

			<div className="std-field-label form-title-inline ingrMethNoteTitle">
				Ingredients
				<span className="requiredStar"> *</span>
			</div>

			<div id="addRemoveBtn-container">
				<button id="add_ingrField" onClick={() => props.addField('ingredients')} type="button">Add Entry</button>
				<button id="remove_ingrField" onClick={() => props.removeField('ingredients')} type="button">Remove Last</button>
			</div>

			{ 	props.ingredients.map((ingredient, index) => 
					<IngredientElement 
						key={index} 
						number={index}
						ingr={ingredient} 
						handleInput={props.handleInput} 
						/>
				)
			}

		</React.Fragment>
	);
	
}


export default Ingredients;