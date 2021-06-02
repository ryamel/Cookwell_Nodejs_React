const express = require('express');
const Joi = require('joi'); // upper case named because module returns a Class
const cors = require('cors');
const mongo = require('mongodb');
mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true});
const assert = require('assert');
const app = express();


mongoose.connect(uri, options).then(
  () => { /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */ },
  err => { /** handle initial connection error */ }
);

// const url = 'mongodb://localhost:5000/test'; // 5000 port of local server

const port = process.env.PORT || 3000

// app.get('/api/cardData', (req, res) => {
//   const cardData = [
//         {
//         	id: 1, 
//         	title: 'John', 
//         	author: 'Doe', 
//         	link: './', 
//         	imgSrc: './', 
//         	description: 'test descrip'
//         },
//         {
//         	id: 2, 
//         	title: 'Brad', 
//         	author: 'Traversy', 
//         	link: './', 
//         	imgSrc: './', 
//         	description: 'test descrip'
//         },
//         {
//         	id: 3, 
//         	title: 'Mary', 
//         	author: 'Swanson', 
//         	link: './', 
//         	imgSrc: './', 
//         	description: 'test descrip'
//         }
//     ];
//     res.json(cardData);
// });




// BELW IS TUTOIRAL INFORMATION

// const courses = [
//     {id: 1, name: 'course1'},
//     {id: 2, name: 'course2'},
//     {id: 3, name: 'course3'}
// ];



// how to handle GET request. This returns an object containing all of the parameters send by the request 
// : defines the parameter name 
app.get('/api/posts/:months/:year', (req, res) => {
    res.send(req.params); 
});





// search DB object 'courses' with a condition
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with given id was not found');
    } else {
        res.send(course);
    }
});





// middleware needed for  post request example below
app.use(express.json()); 



// needed to validate get/post requests
function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return result = Joi.validate(course, schema);
}



// Respond to http POST request, in this case to create a new course
// first create a new course object using the request data, sent via POST to the server
app.post('/api/courses', (req, res) => {

    // Joi package for validation
    const { error } = validateCourse(req.body); // get error property only from returned object
    if (error) {
        res.status(400).send(error.details[0].message);
        return
    }


    const course = {
        id: courses.length + 1,
        name: req.body.name
    }

    courses.push(course);
    res.send(course);
});






// UPDATING DB ENTRY
app.put('/api/courses/:id', (req, res) => {

    // look up course. if course not exit, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with given id was not found');
    } else {
        res.send(course);
    }

    //Validate. if invalud, return 400 - bad request
    const result = validateCourse(req.body);
    const { error } = validateCourse(req.body); // get error property only from returned object
    if (error) {
        res.status(400).send(error.details[0].message);
        return
    }

    // Update course. return updated course to client
    course.name = req.body.name;
    res.send(course);
});


// HTTP DELETE REQUEST
app.delete('/api/courses/:id', (req, res) => {

    // find course, if not exit return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with given id was not found');
    } else {
        res.send(course);
    }

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1); // delete one object starting at index value


    // return same course
    res.send(course);
});







// module to create, delete, get users/recipies
const db = require('./models_mong');

app.get('/api/recipes', (req, res) => {
  
    // get recipe data from MongoDB
    const prom = db.getRecipes(); // build recipies function

    // send data to client
    prom
        .then((recipe) => {
            console.log;
            res.send(recipes);
        })
        .catch((err) => console.log(err.message));  
});







app.listen(port, () => `Server running on port ${port}`);









// create model using method .model(COLLECTION, SCHEMA) and COLLECTION must be lower case
// const Recipes = mongoose.model('recipes', recipesSchema); // const Course is a class

// ADD ENTRY TO DB, uses an async function
// async function createColl() {
//  try {
//      const recipe = new Recipes({
//          authorid: 21,
//          title: 'Title Recipe Test 2',
//          description: 'description of recipe here.dskjfdhlsj hlksdjh kljfh lksjdf kjsdh lkjsf lk adfslkj',
//          mealType: 'Sandwiches',
//          diet: ['Vegan'],
//          servings: '2 servings',
//          imgSrc: '/media/example.jpg',
//          cookTime: 60,
//          ingredients: ['Example of ingredient 1','Example of ingredient 2'],
//          ingrQtys: ['1tbsp', '1tbsp'],
//          method: ['Example of method 1', 'Example of method 2'],
//          cusine: ['Asian', 'Caribbean']
//      });
//      const result = await recipe.save();
//      console.log(result); // output to terminal
//  }

//  catch (err) {
//      console.log(err.message); // output to terminal
//  }
// }


//createColl();


async function getRecipe() {
    // eq (equal)
    // ne (equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)

    const queriedRecipes = await Recipes
        //.find({authorid: { $gt: 20 } }) find greater than 20
        //.find({authorid: { $gt: 20, $lte: 30 } })  greater than 20 or less than 30
        //.find({authorid: { $in: [20, 34, 45] } })  find equal to 20, 34 or 45
        //.find({authorid: { $in: [20, 34, 45] } })
        //.or( [ {authorid: 21}, {cooktime: 60} ] ) or operator is placed after find() withour parameters
        .limit(10)
        .sort({name: 1}) // key value pairs for sorting options. In this case, 1 = ascending order, -1 = descending order
        .select({ ingredients: 1, title: 1 }) // select the properties of the document we want to return. Again, 1 = ascending order, -1 = descending order 
        .count(); // returns count of returned results
    return queriedRecipes;


    //.find({title: { /patturn/ } }) uses regular expression to search strings
    //  /^Mosh/ search mosh at beginning of string
    //  /Mosh$/ search mosh at beginning of string
    //  /.*Mosh.*/ string contains Mosh
    //  /.*Mosh.*/i string contains Mosh case insensitive
    // search js regular expressions for more help
}


// TUTORIAL
// create promise that is already resolved for simulating a scinario
// create resolved / successfull promise
// const p = Promise.resolve({id: 23});
// p.then(result => console.log(result));

// // create rejected / unsuccessful promise

// const p = Promise.reject(new Error('Description of error...'));   <-- the Error object will give the call stack on the console
// p.catch(err => console.log(err));


// TUTORIAL
// multiple async operations
// const p1 = new Promise((resolve) => {
//  setTimeout(() => {
//      console.log('Async operation 1...');
//      resolve(1); // resolve meas to return
//  }, 2000);
// });

// const p2 = new Promise((resolve) => {
//  setTimeout(() => {
//      console.log('Async operation 2...');
//      resolve(2); // resolve meas to return
//  }, 2000);
// });

// // console logs the reslut after all promises are resolved or rejected
// Promise.all([p1, p2]); // call all promises
//  .then(result => console.log(result))
//  .catch(err => console.log(err));

// // .race  alternatively, promise is resolved as soon as the first promise is finished.
// Promise.race([p1, p2]); // call all promises
//  .then(result => console.log(result))
//  .catch(err => console.log(err));

// // aysync and await
// // write async code as if it was sync
// // must decoration the function with async to use the await cmd. As well as try catch blocks
// const user = await getUser();
// async function () {
//  try {

//  }
//  catch {

//  }
// }






const obj = db.getRecipeById();
obj.then()
console.log(obj);






















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