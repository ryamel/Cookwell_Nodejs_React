

const express = require('express');
const app = express();
const Joi = require('joi'); // upper case named because module returns a Class
const mongo = require('mongodb');
const assert = require('assert');
const mongoose = require('mongoose');
require('dotenv').config();


const db = mongoose.connect(process.env.DB_connection, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}, () => console.log('connected to DB'));



// app.use installs a middleware function
// when a request is send to the server, middlware is used to perform actions on the request and response object
// middlware always takes the form of... function name(req, res, next) { }
// redirects api router to the file used to create the users object
const users = require('./routes/users');
const recipes = require('./routes/recipes');
app.use(express.json());

app.use('/api/users', users);
app.use('/api/recipes', recipes);










const port = process.env.PORT || 5000; // 3000

app.listen(port, () => `Server running on port ${port}`);



