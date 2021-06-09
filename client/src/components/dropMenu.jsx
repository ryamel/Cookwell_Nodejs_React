import React, { useState, useEffect, useRef } from "react";
import './dropMenu.sass';




function DropMenu(props) {

	const [isOpen, setIsOpen] = useState(false);

	let menuRef = useRef();
	let menuBtnRef = useRef();

	useEffect(() => {
		document.addEventListener("mousedown", (event) => {
			if (menuRef.current && !(menuRef.current.contains(event.target) || menuBtnRef.current.contains(event.target)) ) {
				setIsOpen(false); 
			}
		});
	})

	return (
		<React.Fragment>

    		<div ref={menuBtnRef} className='selectButton' onClick={() => setIsOpen((isOpen) => !isOpen)}  >
    			<span className='selectOptions' >Select Options</span>
    			<div className='arrow-down'></div>
    		</div> 

		    { 
		    	isOpen && renderMenuOptions(props.options, menuRef, props.handleInput, props.stateName, props.state) 
		    }

	    </React.Fragment>
	)
}





function renderMenuOptions(optionNames, menuRef, handleInput, stateName, state) {
	//console.log(state);
	return(
		<div ref={menuRef} className='dropMenu' >
		{
			optionNames.map((optionName, index) => 
				<label key={index} className="check-container"> 
					{optionName}
					<input 
						name={stateName} 
						checked={state.includes(optionName)}
						type="checkbox"
						value={optionName}
						onChange={(event) => handleInput(event)} // the event object needs to be passed this way if a child component is calling a parent function
					/>
					<span className="checkmark"></span>
				</label> 
			)
		}
		</div>
	)
}



export default DropMenu;




