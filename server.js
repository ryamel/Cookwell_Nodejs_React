// app.use installs a middleware function

const express = require('express');
const app = express();
const mongo = require('mongodb');
const assert = require('assert');
const cors = require('cors'); 




// mongoose, plus depreciated settings to remove error msg's
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true)

// allows use of .env files
require('dotenv').config();

// allows reading of cookies on front end (verifyToken middleware)
const cookieParser = require('cookie-parser'); 
app.use(cookieParser()); 

// * required to parse any http json data --> places json data into req.body
app.use(express.json()); 


if (!process.env.private_key) {
    console.log('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

const db = mongoose.connect(process.env.DB_connection, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}, () => {
	console.log('connected to mongooseDB');
});



// load production middleware
require('./middleware/prod')(app); 






// app.use(express.urlencoded({extended: true}));

// body parser
// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());


const users = require('./routes/users');
const recipes = require('./routes/recipes');
const mail = require('./routes/mail');
app.use('/api/users', users);
app.use('/api/recipes', recipes);
app.use('/api/mail', mail);





// const port = process.env.PORT || 5000; // 5000
const port = 5000; 
app.listen(port, () => `Server running on port ${port}`);



