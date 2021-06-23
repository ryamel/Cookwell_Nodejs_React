const express = require('express');
const multer = require('multer');
const path = require('path');

//destination: function (req, file, cb) { cb(null, 'client/public/test_upload') } // public is name of folder

var storage = multer.diskStorage({
	filename: function (req, file, cb) { cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname)) },
	destination: function (req, file, cb) { cb(null, 'client/tmp_upload/') } 
});


// 3
// var upload_valid = multer({
// 	storage: storage,
// });



	// fileFilter: (req, file, cb) => {
	// 	if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
	// 		cb(null, true);
	// 	} else {
	// 		cb(null, false);
	// 	}
	// }





var upload = multer({
	storage: storage
});



module.exports.upload = upload;

// module.exports = { upload_valid } also valid


