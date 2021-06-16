import React, {Component} from "react";
import { units } from '../searchOptions';


function AddIngredientFields(props) {


	var field = props.ingredients.map((ingredient, index) => 
    	<div key={index} className='field-container-add'>

			<input 
				title={index}
				className='quantity' 
				name='qty' 
				placeholder='Quantity' 
				value={ingredient.qty}
				onChange={(e) => props.handleInput(e.target.name, e.target.value, e.target.title)}
			/>

			<select 
				title={index}
				className='typeSelectUnit' 
				name='unit'
				value={ingredient.unit}
				onChange={(e) => props.handleInput(e.target.name, e.target.value, e.target.title)}
			>
				<option className='unitDefault' >Unit</option>
				{
					units.map((unit, index) => 
						<option key={index} value={unit} >{unit}</option>
					)
				}
			</select>

			<input 
				title={index}
				className='ingr' 
				name='text' 
				placeholder='Ingredient Name' 
				value={ingredient.name}
				onChange={(e) => props.handleInput(e.target.name, e.target.value, e.target.title)}
			/>

		</div>  
	);

	return field;

}



export default AddIngredientFields;