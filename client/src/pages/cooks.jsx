import React from "react";
import {Link} from 'react-router-dom';
import CookProfile from '../components/cookProfile';
import './cooks.sass';

const Cooks = () => (
	
	<div id="cookBody">
		<CookProfile cookLink='test' imgLocation='./' description='tes' web='test'/>
		<CookProfile cookLink='test' imgLocation='./' description='tes' web='test'/>
		<CookProfile cookLink='test' imgLocation='./' description='tes' web='test'/>
	</div>

);


export default Cooks;