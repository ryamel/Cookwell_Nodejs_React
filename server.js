// app.use installs a middleware function

const express = require('express');
const app = express();
const mongo = require('mongodb');
const assert = require('assert');
const cors = require('cors'); 
const path = require('path');




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
	console.log('Server connected to mongoDB Atlas');
});

// load production middleware
 // require('./middleware/prod')(app); 

// Have Nodejs serve the static files from the React app (needed for production build)
app.use(express.static(path.join(__dirname, 'client/build')));

// A result of using react Router. The server trys to serve up static html pages for each page. But all pages are handles in index.html....
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});





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
const port = 4000; 
// const host = '0.0.0.0'; 
// app.listen(port, host, () => `Server running on port ${port}`);
app.listen(port, () => console.log(`Server running on port ${port}`));



