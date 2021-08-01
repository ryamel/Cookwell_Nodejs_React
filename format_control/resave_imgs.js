const express = require('express');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true)
const mongo = require('mongodb');
require('dotenv').config();
const cors = require('cors'); 
var fs = require('fs');
var path = require('path');
const sharp = require('sharp');


	mongoose.connect(process.env.DB_connection, {
	    useNewUrlParser: true, 
	    useUnifiedTopology: true 
	}, () => {
		console.log('connected to DB');
		// let db = mongoose.connection.db;
		// db.collection('recipesOld').rename('recipesold');
	});


	async function saveToFile(files) {
		for (const fileName of files) {
			var targetPath = path.join("client", "public", "user_recipes_img", "original", fileName);
			var targetPath_300x300 = path.join("client", "public", "user_recipes_img", "300_300", fileName);
			var targetPath_500x550 = path.join("client", "public", "user_recipes_img", "500_550", fileName);

			try {
		        await sharp(targetPath)
		            .resize(300, 300, {fit: 'outside'}) // width, height (pixels)
		            .jpeg({ quality: 100 })
		            .toFile(targetPath_300x300, (err, info) => { if (err) console.log(err) });

		        await sharp(targetPath)
		            .resize(500, 500, {fit: 'outside'}) // width, height (pixels)
		            .jpeg({ quality: 100 })
		            .toFile(targetPath_500x550, (err, info) => { if (err) console.log(err) });
			}
			catch (err) {console.log(err)}
		};
	};





	console.log('attempt');

	var folder = path.join("client", "public", "user_recipes_img", "original");

	fs.readdir(folder, function (err, files) {
		if (err) {
			console.error("Could not list the directory.", err);
			process.exit(1);
		}

		saveToFile(files);
	})




