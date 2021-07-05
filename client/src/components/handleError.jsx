import React, { Component } from 'react';
import './handleError.sass';

class HandleError extends Component {
	constructor(props) {
		super();
		this.state = {
			errMsg: props.errMsg,
			error: null
		}
	}



	render() {
		var errMsg = this.props.errMsg;
		return null;
		// if (errMsg.length > 0) {
		// 	console.log('hello');
		// 	const timer = setTimeout(() => {
		// 		this.setState({errMsg: ''});
		// 	}, 5500);
		// 	return <div className='bannerMsgBar'>{this.state.errMsg}</div>;
		// } else {
		// 	return null;
		// }
	}
}

export default HandleError;