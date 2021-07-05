import React, {Component} from "react";
import { units } from '../searchOptions';


function IngredientElement(props) {

	return (
    	<div className='field-container-add'>

			<input 
				className='quantity' 
				name='qty' 
				placeholder='Quantity' 
				value={props.ingr.qty}
				onChange={(e) => props.handleInput(e.target.name, e.target.value, props.number)}
				/>

			<select 
				className='typeSelectUnit' 
				name='unit'
				value={props.ingr.unit}
				onChange={(e) => props.handleInput(e.target.name, e.target.value, props.number)}
				>
				<option className='unitDefault'>unit of quantity</option> {/* ! You must adjust "/api/recipes/upload" server route code if this string is modified */}
				{
					units.map((unit, index) => 
						<option key={index} value={unit} >{unit}</option>
					)
				}
			</select>

			<input 
				className='ingr' 
				name='gtext' 
				placeholder='Ingredient Name' 
				value={props.ingr.gtext}
				onChange={(e) => props.handleInput(e.target.name, e.target.value, props.number)}
				/>

		</div>  
	);


}



export default IngredientElement;