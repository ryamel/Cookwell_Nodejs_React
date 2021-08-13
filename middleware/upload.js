const express = require('express');
const multer = require('multer');
const path = require('path');

if (process.env.production == 'true') {
	var tmpLocation = '../../../mnt/volume1/tmp_upload';
} else {
	var tmpLocation = 'client/tmp_upload/';
}

var storage = multer.diskStorage({
	filename: function (req, file, cb) { cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname)) },
	destination: function (req, file, cb) { cb(null, tmpLocation) } 
});


var upload = multer({
	storage: storage
});



module.exports.upload = upload;
// module.exports = { upload_valid } also valid


