const express = require('express');
const multer = require('multer');
const path = require('path');


var storage = multer.diskStorage({
	filename: function (req, file, cb) { cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname)) },
	destination: function (req, file, cb) { cb(null, 'client/tmp_upload/') } 
});


var upload = multer({
	storage: storage
});



module.exports.upload = upload;
// module.exports = { upload_valid } also valid


