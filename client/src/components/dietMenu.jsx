import React from "react";




function DietMenu(props) {

	return (
		<React.Fragment>
			<span className='restriction-label'>Dietary</span>
			{
				props.dietOptions.map((dietOption, index) => 
					<label key={index} className="check-container"> 
						{dietOption}
						<input 
							name='diet' 
							type='checkbox' 
							value={dietOption}
							onChange={(event) => props.handleInput(event)} // the event object needs to be passed this way if a child component is calling a parent function
						/>
						<span className="checkmark"></span>
					</label> 
				)
			}
		</React.Fragment>
	)
}



export default DietMenu;