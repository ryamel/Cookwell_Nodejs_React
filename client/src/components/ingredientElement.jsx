import React, {Component} from "react";
import { units } from '../searchOptions';


function IngredientElement(props) {
	return (
    	<div className='field-container-add'>

			<input 
				className='quantity' 
				name='qty' 
				placeholder='Quantity' 
				value={props.qty}
				onChange={(e) => props.handleInput(e.target.name, e.target.value, props.number)}
				/>

			<select 
				className='typeSelectUnit' 
				name='unit'
				value={props.unit}
				onChange={(e) => props.handleInput(e.target.name, e.target.value, props.number)}
				>
				<option className='unitDefault' >- Unit -</option>
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
				value={props.gtext}
				onChange={(e) => props.handleInput(e.target.name, e.target.value, props.number)}
				/>

		</div>  
	);


}



export default IngredientElement;