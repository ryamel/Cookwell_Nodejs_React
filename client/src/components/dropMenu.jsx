
// how to use. Because of the format you need to be using class component to use DropMenu
// name props is the same of the name attribute for any input field
// options is an array of selections that will appear in the menu
// handleinput should be a function which passes to your input handler (assuming you are using controlled components/fields)
// state should be the state


//<DropMenu 
// 	name='cuisine'
// 	options={cuisine} 
// 	handleInput = {(e) => this.handleInput(e.target.name, e.target.value)}
// 	state={this.state.cuisine}
// />


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
		    	isOpen && renderMenuOptions(props.options, menuRef, props.handleInput, props.name, props.state) 
		    }

	    </React.Fragment>
	)
}





function renderMenuOptions(optionNames, menuRef, handleInput, name, state) {

	return(
		<div ref={menuRef} className='dropMenu' >
		{
			optionNames.map((optionName, index) => 
				<label key={index} className="check-container"> 
					{optionName}
					<input 
						name={name} 
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




