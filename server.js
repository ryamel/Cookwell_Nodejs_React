const express = require('express');
const app = express();
const mongo = require('mongodb');
const assert = require('assert');
const cors = require('cors'); 
const path = require('path');
const mongoose = require('mongoose'); 
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true)
require('dotenv').config(); // allows .env files
const cookieParser = require('cookie-parser'); // allows reading of cookies on client (verifyToken middleware)
app.use(cookieParser()); 
app.use(express.json()); // * required to parse http json data -> req.body

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


const users = require('./routes/users');
const recipes = require('./routes/recipes');
const mail = require('./routes/mail');
app.use('/api/users', users);
app.use('/api/recipes', recipes);
app.use('/api/mail', mail);



// allow use of assests available by url... https://dominaName.com/images.jpg
// Set static folder...Have Nodejs serve the static files from the React app (needed for production build)
console.log('env.production:', process.env.production);
if (process.env.production == 'true') {
	console.log('PRODUCTION BUILD');
	app.use(express.static('../../mnt/volume1')); // access to mounted volume from Digital Oceans for serving static images. Directory is relative to server.js file location
	app.use(express.static(path.join(__dirname,'client','build'))); // needed for server production build static assests
	app.get('/*', (req, res) => {	// A result of using react Router. The server trys to serve up static html pages for each page. But all pages are handles in index.html....
	    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
	});
} else {
	console.log('DEV BUILD');
}




const port = process.env.PORT || 4000; 
app.listen(port, () => console.log(`Server running on port ${port}`));



