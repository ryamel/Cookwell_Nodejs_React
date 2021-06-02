

const express = require('express');

const app = express();

app.use(express.json());

const Joi = require('joi'); // upper case named because module returns a Class

const mongo = require('mongodb');

const assert = require('assert');

const mongoose = require('mongoose');

// require('dotenv/config');
require('dotenv').config();

const port = process.env.PORT || 5000; // 3000

mongoose.connect(process.env.DB_connection, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}, () => console.log('connected to DB'));

// const db = mongoose.connection;
// db.on('error', (error) => console.log(error));
// db.once('open', () => console.log('Connected to mongoDB...'));




// these constructors allow interaction with the DB tables
const User = require('./models/users');
const Recipe = require('./models/recipes');





app.get('/api/recipes/:option', async (req, res) => {

    if (option == 'featured') {
        try {
            const recipe = await Recipe.find({}).limit(8);
            res.json(recipe);
        }
        catch (err) {
            res.status(500).json( {message: err.message} ); // server fucks up, send 500
        }
    }

    if (option == 'latest') {
        try {
            const recipe = await Recipe.find({}).limit(8).;
            res.json(recipe);
        }
        catch (err) {
            res.status(500).json( {message: err.message} ); // server fucks up, send 500
        }
    }

});








app.post('/api/postrecipe/', async (req, res) => {
    const rec = new Recipe({
        title:  req.body.title,
        authid:  req.body.authid,
        description:  req.body.description,
        mealType: req.body.mealType,
        diet: req.body.diet,
        cusine: req.body.cuisine,
        servings: req.body.servings,
        img:  req.body.img,
        cookTime: req.body.cookTime,
        ingredients: req.body.ingredients,
        method: req.body.method,
        notes: req.body.notes
    });

    try {
        const saveRec = await rec.save();
        res.status(201).json(saveRec);
    }
    catch (err) {
        res.status(400).json({message: err.message}); // client fucks up, send 400
    }

});


app.post('/api/postusers/', async (req, res) => {
    const user = new User({
        displayName:  req.body.displayName,
        pwd: req.body.pwd,
        email: req.body.email,
        about: req.body.about
    });

    try {
        const userSave = await user.save();
        res.status(201).json(userSave);
    }
    catch (err) {
        res.status(400).json({message: err.message}); // client fucks up, send 400
    }

});




app.get('/api/getrecipebyid/:id', async (req, res) => {
    
    const query = await Recipe.findOne({_id: req.params.id});
    console.log(query);

    if (!query) {
        res.status(404).send('The course with given id was not found');
    } else {
        res.json(query);
    }

});






app.listen(port, () => `Server running on port ${port}`);




// // middleware needed for  post request example below
// app.use(express.json()); 



// function validateCourse(course) {
//     const schema = {
//         name: Joi.string().min(3).required()
//     };
//     return result = Joi.validate(course, schema);
// }



// app.post('/api/courses', (req, res) => {

//     // Joi package for validation
//     const { error } = validateCourse(req.body); // get error property only from returned object
//     if (error) {
//         res.status(400).send(error.details[0].message);
//         return
//     }


//     const course = {
//         id: courses.length + 1,
//         name: req.body.name
//     }

//     courses.push(course);
//     res.send(course);
// });






// // UPDATING DB ENTRY
// app.put('/api/courses/:id', (req, res) => {

//     // look up course. if course not exit, return 404
//     const course = courses.find(c => c.id === parseInt(req.params.id));
//     if (!course) {
//         res.status(404).send('The course with given id was not found');
//     } else {
//         res.send(course);
//     }

//     //Validate. if invalud, return 400 - bad request
//     const result = validateCourse(req.body);
//     const { error } = validateCourse(req.body); // get error property only from returned object
//     if (error) {
//         res.status(400).send(error.details[0].message);
//         return
//     }

//     // Update course. return updated course to client
//     course.name = req.body.name;
//     res.send(course);
// });


// // HTTP DELETE REQUEST
// app.delete('/api/courses/:id', (req, res) => {

//     // find course, if not exit return 404
//     const course = courses.find(c => c.id === parseInt(req.params.id));
//     if (!course) {
//         res.status(404).send('The course with given id was not found');
//     } else {
//         res.send(course);
//     }

//     // Delete
//     const index = courses.indexOf(course);
//     courses.splice(index, 1); // delete one object starting at index value


//     // return same course
//     res.send(course);
// });







// // module to create, delete, get users/recipies
// const db = require('./models_mong');

// app.get('/api/recipes', (req, res) => {
  
//     // get recipe data from MongoDB
//     const prom = db.getRecipes(); // build recipies function

//     // send data to client
//     prom
//         .then((recipe) => {
//             console.log;
//             res.send(recipes);
//         })
//         .catch((err) => console.log(err.message));  
// });



































// app.get('/get-data', (req, res) => {
//     mongo.connect(url, (err, db) => {
//         assert.equal(null, err);
//         var currsor = db.collection('user-data').find();
//         cursor.forEach((doc, err) => {
//             assert.(null, err)
//         })
//     });
// });

// app.post('/insert', (req, res) => {
//     var item = {
//         title: req.body.title,
//         content: req.body.content,
//         author: req.body.author
//     }

//     mongo.connect(url, (err, db) => {
//         assert.equal(null, err);
//         db.collection('user-data').insertOne(item, (err, result) => {
//             assert.equal(null, error);
//             console.log('item inserted');
//             db.close();
//         })
//     })
// });

// app.post('/update', (req, res) => {
    
// });

// app.post('/delete', (req, res) => {
    
// });





// structure of a fetch request. Note that data object is created from the
// '.json' method. If the response was a text file then the method would be '.text'
// fetch('http://example.com/movies.json')
//   .then(response => response.json())
//   .then(data => console.log(data));