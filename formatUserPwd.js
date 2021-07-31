const express = require('express');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true)
const mongo = require('mongodb');
require('dotenv').config();
const cors = require('cors'); 
const bcrypt = require('bcrypt');

mongoose.connect(process.env.DB_connection, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}, () => {
	console.log('connected to DB');
	// let db = mongoose.connection.db;
	// db.collection('recipesOld').rename('recipesold');
});



const { User } = require('./models/users');




// use id to set new pwd
async function call(id, setPwd) {
	try {
		console.log('attempt: ', setPwd);

		// encypt pwd using bcrypt library
	    const salt = await bcrypt.genSalt(10);
	    const hashPwd = await bcrypt.hash(setPwd, salt);
	    console.log('hash Pwd: ', hashPwd);

		await User.findOneAndUpdate({_id: id}, {pwd: hashPwd});
		console.log('success');
	}
	catch (err) {
		console.log(err);
	}
}






call('60f4f185c5829428459a5b19', 'admincookwell');