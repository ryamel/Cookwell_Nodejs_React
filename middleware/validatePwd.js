const express = require('express');


function validatePwd(pwd, pwdRepeat) {
	if (pwd !== pwdRepeat) return 'Passwords do not match';
	if (pwd.length < 8) return 'Password must be at least 8 characters';
	return null;
}

exports.validatePwd = validatePwd;

