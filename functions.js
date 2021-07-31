
const CryptoJS = require("crypto-js");

exports.decrypt = function (string) {
	try {
    	var decryptObj = CryptoJS.AES.decrypt(string, process.env.encryptKey);
    	return decryptObj.toString(CryptoJS.enc.Utf8);
    }
    catch (err) {
    	console.log(err);
    	return null;
    }
}

exports.encrypt = function (string) {
	try {
		var encryptedObj = CryptoJS.AES.encrypt(string, process.env.encryptKey);
		return encryptedObj.toString();
	}
	catch (err) {
		console.log(err);
		return null;
	}
}

