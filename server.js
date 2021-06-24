
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const Joi = require('joi'); // upper case named because module returns a Class
const mongo = require('mongodb');
const assert = require('assert');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true)
const cors = require('cors');
require('dotenv').config();



//app.use(express.static('public')); //


if (!process.env.private_key) {
    console.log('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

// const os = require("os");
// const tempDir = os.tmpdir(); // /tmp

// console.log(tempDir);

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
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/api/users', users);
app.use('/api/recipes', recipes);







const port = process.env.PORT || 5000; // 3000
app.listen(port, () => `Server running on port ${port}`);



