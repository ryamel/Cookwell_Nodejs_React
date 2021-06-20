
const { User, validateUser } = require('../models/users');
const Recipe = require('../models/recipes'); // these constructors allow interaction with the DB tables


const mogoose = require('mongoose');
const express = require('express');




const router = express.Router();








router.get('/', async (req, res) => {

    try {
        var recipes = await Recipe.find().limit(20).sort({uploadDate: -1}); 
        let i = 0;

        for (const recipe of recipes) {
            var auth = await User.findOne({_id: recipe.authid}).select('displayName -_id'); 
            recipes[i].authorName = auth.displayName; 
            i++;
        }
        res.json(recipes);
    }
    catch (err) {
        res.status(500).json( {message: err.message} );
    }
    
});





router.post('/search/:random', async (req, res) => {
    try {

        // build query object
        var query = {};
        if (req.params.random == 1) {
            // figure out how to shuffle results for intial load of results on search-page
        } else {

            if (req.body.diet.length > 0) {
                query['diet'] = {$all: req.body.diet};
            }
            if (req.body.time) {
                query['cookTime'] = {$lt: parseInt(req.body.time)};
            }
            if (req.body.cuisine.length > 0) {
                query['cuisine'] = {$in: req.body.cuisine};
            }
            if (req.body.mealType.length > 0) {
                query['mealType'] = {$in: req.body.mealType};
            }
            if (req.body.searchText !== "") {
                query['$text'] = {$search: req.body.searchText}; // searchs all fields specfied under Text Index on MongoDB
            }

        }


        // search query
        var recipes = await Recipe
            .find(query); // will need to add pagination at some point...

        res.json(recipes);
    }
    catch (err) {
        res.status(400).json({message: err.message}); 
    }

});





router.get('/search/auto', async (req, res) => {
    try {
        var recipes = await Recipe.find();
        res.json(recipes);
    }
    catch (error) {
        res.status(400).json({message: err.message});
    }
});






router.get('/getbyuserid/:id', async (req, res) => {

    const query = await Recipe.find({authid: req.params.id});

    if (!query) {
        res.status(404).json({msg: 'The course with given id was not found'});
    } else {
        res.status(200).json(query);
    }

});







router.get('/get-latest/', async (req, res) => {

    try {
        var recipes = await Recipe.find().limit(8).sort({uploadDate: -1}); //.sort({uploadDate: -1});
        let i = 0;

        for (const recipe of recipes) {
            var auth = await User.findOne({_id: recipe.authid}).select('displayName -_id'); 
            recipes[i].authorName = auth.displayName; // keys added to object must be included in mongoose schema!
            i++;
        }
        res.json(recipes);
    }
    catch (err) {
        res.status(500).json( {message: err.message} ); // server fucks up, send 500
    }
    
});






router.get('/get-featured/', async (req, res) => {

    try {
        var recipes = await Recipe.find().limit(8);
        let i = 0;

        for (const recipe of recipes) {
            var auth = await User.findOne({_id: recipe.authid}).select('displayName -_id'); 
            recipes[i].authorName = auth.displayName; // keys added to object must be included in mongoose schema!
            i++;
        }
        
        res.json(recipes);
    }
    catch (err) {
        res.status(500).json( {message: err.message} ); // server fucks up, send 500
    }
    
});






router.post('/add-new', async (req, res) => {
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
        res.status(400).json({message: err.message}); 
    }

});








const { upload, validate_img } = require('../middleware/upload');
const validate_RecipeData = require('../middleware/validate_RecipeData');


// 4
router.post('/upload', (req, res) => {
    console.log(req.body);
    
    console.log('sup');
    res.status(200).json('success');

});



// middleware validate recipe data using .validate in mongoose

// if no issues with .validate run multer middlware, saving img

// finally .save recipe data




module.exports = router;










