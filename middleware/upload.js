const express = require('express');
const multer = require('multer');





var storage = multer.diskStorage({
	destination: function (req, file, cb) { cb(null, 'client/public/test_upload') }, // public is name of folder
	filename: function (req, file, cb) { cb(null, req.body.img) }
});

var upload = multer({
	storage: storage,
});









var validate_img = multer({
	fileSize: 8000000, // 8 MB file limit
	fileFilter: (req, file, cb) => {
		if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
			cb(null, true);
		} else {
			cb(null, false);
		}
	}
});



module.exports = { upload, validate_img };


