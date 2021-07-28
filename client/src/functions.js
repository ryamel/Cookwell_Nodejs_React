



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

export { getURLparam };