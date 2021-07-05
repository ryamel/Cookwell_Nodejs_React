

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const Joi = require('joi'); // upper case named because module returns a Class
const mongo = require('mongodb');
const assert = require('assert');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true)
const cors = require('cors');
require('dotenv').config();


if (!process.env.private_key) {
    console.log('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

const db = mongoose.connect(process.env.DB_connection, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}, () => console.log('connected to DB'));



// app.use installs a middleware function


app.use(cookieParser());
app.use(express.json()); // * required to parse any http json data --> places json data into req.body


//app.use(express.urlencoded({extended: true}));

// body parser
// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());


const users = require('./routes/users');
const recipes = require('./routes/recipes');
app.use('/api/users', users);
app.use('/api/recipes', recipes);







//const port = process.env.PORT || 5000; // 5000
const port = 5000; 
app.listen(port, () => `Server running on port ${port}`);



