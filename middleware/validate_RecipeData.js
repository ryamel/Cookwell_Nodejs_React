const express = require('express');




function validate_RecipeData(req, res, next) {

    // parse json objects (arrays and objects)
    req.body.diet = JSON.parse(req.body.diet);
    req.body.cuisine = JSON.parse(req.body.cuisine);
    req.body.ingredients = JSON.parse(req.body.ingredients);
    req.body.method = JSON.parse(req.body.method);
    req.body.notes = JSON.parse(req.body.notes);
    req.body.cookTime = parseInt(req.body.cookTime);



    // check title 
    if (req.body.title.length < 3 ) return res.status(400).send('Title must be at least 3 characters')
    if (req.body.title.length > 80 ) return res.status(400).send('Title must be less than 80 characters')
    
    // check if user has title of same recipe already


    // check description
    if (req.body.description.length > 500 ) return res.status(400).send('Description must be less than 500 characters')
    
    // check servings
    if (req.body.servings.length < 1 ) return res.status(400).send('Servings field is required')

    // check cooktime
    if (!Number.isInteger(req.body.cookTime)) return res.status(400).send('Cook time must be a valid integer')

    // diet
    // if ( req.body.diet.includes('None') && req.body.diet.length > 1 ) return res.status(400).send('Invalid diet selection')
    // if ( req.body.diet.includes('None') && req.body.diet.length == 1) req.body.diet = [];

    // check ingredients
    for (const ingr of req.body.ingredients) {
        if (ingr.gtext.length < 1) return res.status(400).send('Empty ingredient field')
        if (ingr.qty.length < 1) return res.status(400).send('Empty qty field')
        if (ingr.unit.length < 1) return res.status(400).send('Empty unit field')
    };

    // check methods
    for (const method of req.body.method) {
        if (method.length < 1) return res.status(400).send('Empty method field')
    };

    // check notes
    var notes = req.body.notes;
    for (var i = notes.length - 1; i >= 0; i--) {
        if (notes[i].length < 1) notes.splice(i, 1);
    };
    req.body.notes = notes;


    next();
}


module.exports = validate_RecipeData;
