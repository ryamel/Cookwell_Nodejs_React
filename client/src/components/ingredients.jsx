import React, {Component} from "react";
import { units } from '../searchOptions';
import AddIngredientFields from './AddIngredientFields';

function Ingredients(props) {

	return (

		<div id="dynamic_ingredients">
			<div className="std-field-label form-title-inline ingrMethNoteTitle">
				Ingredients
				<span className="requiredStar"> *</span>
			</div>

			<div id="addRemoveBtn-container">
				<button id="add_ingrField" onClick={props.addIngrField} type="button">Add Entry</button>
				<button id="remove_ingrField" onClick={props.removeIngrField} type="button">Remove Last</button>
			</div>

			<AddIngredientFields ingredients={props.ingredients} handleInput={props.handleInput} />

		</div>
	);
	
}


export default Ingredients;