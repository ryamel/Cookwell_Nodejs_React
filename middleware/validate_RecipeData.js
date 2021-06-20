const express = require('express');
const Recipe = require('../models/recipes');

// validates img and recipe data. 
// If pass... it will save the recipe data in MongoDB and pass to the next middlware, which will handle uploading of the img.


// 2
async function validate_RecipeData(req, res, next) {
    console.log('validate_recipe');

    // if (!req.file) {
    //     return res.status(400).json({err: 'Only .png, .jpg and .jpeg format allowed!'});
    // } else {
    //     return res.status(200).json('success');
    // }

    // var imgFileName = req.body.title.replace(/\s+/g, '_').toLowerCase() + '_' + Date.now() + extension(req.file.mimetype);
    // req.body.img = imgFileName;
    console.log(req);
    // console.log(req.body.cuisine);
    // console.log(req.body.ingredients);
    // console.log(req.body.method);
    // console.log(req.body.notes);


    const recipe = new Recipe({
        title: req.body.title,
        authid: req.body.authid,
        description: req.body.description,
        mealType: req.body.mealType,
        diet: JSON.parse(req.body.diet),
        cuisine: JSON.parse(req.body.cuisine),
        servings: req.body.servings,
        cookTime: req.body.cookTime,
        ingredients: JSON.parse(req.body.ingredients),
        method: JSON.parse(req.body.method),
        notes: JSON.parse(req.body.notes)
    });

    let error = recipe.validateSync();
    console.log(error);

    try {
        const saveRecipe = await recipe.save();
        next();
    }
    catch (err) {
        res.status(400).json({message: err.message}); 
    }
}





function extension(ext) {
    if (ext == "image/png") {
        return '.png';
    } 
    if (ext == "image/jpg" || ext == "image/jpeg") {
        return '.jpg';
    }
}





module.exports = validate_RecipeData;

