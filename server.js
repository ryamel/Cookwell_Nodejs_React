// app.use installs a middleware function

const express = require('express');
const app = express();
const mongo = require('mongodb');
const assert = require('assert');
const cors = require('cors'); 
const path = require('path');

const mongoose = require('mongoose');// mongoose, plus depreciated settings to remove error msg's
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true)

require('dotenv').config();// allows use of .env files

const cookieParser = require('cookie-parser'); // allows reading of cookies on front end (verifyToken middleware)
app.use(cookieParser()); 

app.use(express.json()); // * required to parse any http json data --> places json data into req.body


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


// load production middleware
 // require('./middleware/prod')(app); 

 // app.use(express.urlencoded({extended: true}));

// body parser
// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());


// allow use of assests available by url... https://dominaName.com/images.jpg
//Set static folder...Have Nodejs serve the static files from the React app (needed for production build)
if (process.env.production) {
	console.log('PRODUCTION BUILD');
	//app.use(express.static('/mnt/volume1'));
	//app.use(express.static('../mnt/volume1'));


	app.use(express.static('../../mnt/volume1'));

	// needed to server production build static assests
	app.use(express.static(path.join(__dirname,'client','build')));

	// A result of using react Router. The server trys to serve up static html pages for each page. But all pages are handles in index.html....
	if (process.env.production == true) {
		app.get('/*', (req, res) => {
		    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
		});
	}

} else {
	console.log('DEV BUILD');
}




const port = process.env.PORT || 4000; 
app.listen(port, () => console.log(`Server running on port ${port}`));



