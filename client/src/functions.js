import { unitDisplay } from './searchOptions'


// read url params message, then place message into state so it can be displayed on screen
function getURLparam(param) {
	var url = window.location.href;
	var urlParam = param;
	urlParam = urlParam.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + urlParam + '(=([^&#]*)|&|#|$)'), 
		results = regex.exec(url);
	if (!results || !results[2]) {
		return null;
	} else {
		let m = decodeURIComponent(results[2].replace(/\+/g, ' '));
		m = m.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
		return m;
	}
}

function fracToHtmlEntity(string) {

	// identify fraction in string
	const index = string.indexOf('/'); // indexOf retuns -1 if character not found
	const num1 = parseInt(string[index-1]); // parseInt returns NaN if input is not string
	const num2 = parseInt(string[index+1]);

	// error check
	if (num1 === NaN || num2 === NaN || index === -1) {
		return string;
	}

	// seperate string components
	const firstHalf = string.substring(0, index-1).replace(' ', '');
	const secondHalf = string.substring(index+2);

	// determine unicode value
	if (num1 === 1 && num2 === 4) {
		var unicode = 188;
	} else if (num1 === 1 && num2 === 2) {
		var unicode = 189;
	} else if (num1 === 3 && num2 === 4) {
		var unicode = 190;
	} else if (num1 === 1 && num2 === 7) {
		var unicode = 8528;
	} else if (num1 === 1 && num2 === 9) {
		var unicode = 8529;
	} else if (num1 === 1 && num2 === 10) {
		var unicode = 8530;
	} else if (num1 === 1 && num2 === 3) {
		var unicode = 8531;
	} else if (num1 === 2 && num2 === 3) {
		var unicode = 8532;
	} else if (num1 === 1 && num2 === 5) {
		var unicode = 8533;
	} else if (num1 === 2 && num2 === 5) {
		var unicode = 8534;
	} else if (num1 === 3 && num2 === 5) {
		var unicode = 8535;
	} else if (num1 === 4 && num2 === 5) {
		var unicode = 8536;
	} else if (num1 === 1 && num2 === 6) {
		var unicode = 8537;
	} else if (num1 === 5 && num2 === 6) {
		var unicode = 8538;
	} else if (num1 === 1 && num2 === 8) {
		var unicode = 8539;
	} else if (num1 === 3 && num2 === 8) {
		var unicode = 8540;
	} else if (num1 === 5 && num2 === 8) {
		var unicode = 8541;
	} else if (num1 === 7 && num2 === 8) {
		var unicode = 8542; 
	} else {
		return string;
	}

	return firstHalf + String.fromCharCode(unicode) + secondHalf;
}



function parseIngrUnit(unit) {
	return unitDisplay[unit];
}

export { getURLparam, parseIngrUnit, fracToHtmlEntity };

