import React from "react";


				

function MultiSelectMenu(props) {

	return (
		<React.Fragment>
			{
				props.options.map((option, index) => {
					return props.state.includes(option) ?
					<label key={index} className="check-container"> 
						{option}
						<input 
							defaultChecked
							name={props.name} 
							type='checkbox' 
							value={option}
							onChange={props.handleInput} // the event object needs to be passed this way if a child component is calling a parent function
							/>
						<span className="checkmark"></span>
					</label> 
					:
					<label key={index} className="check-container"> 
						{option}
						<input 
							name={props.name} 
							type='checkbox' 
							value={option}
							onChange={props.handleInput} // the event object needs to be passed this way if a child component is calling a parent function
							/>
						<span className="checkmark"></span>
					</label> 
				})
			}
		</React.Fragment>
	)
}


export default MultiSelectMenu;