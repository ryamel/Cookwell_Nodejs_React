

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const multer = require('multer');
// const path = require('path');
const fs = require('fs');
const fsProm = require('fs').promises;
// const mv = require('mv');
// const sharp = require('sharp');
//const CryptoJS = require("crypto-js");

const { User, validateUser } = require('../models/users');
const Recipe = require('../models/recipes');
const { upload } = require('../middleware/upload');
const verifyToken = require('../middleware/verifyToken');
const validate_RecipeData = require('../middleware/validate_RecipeData');
const { encrypt, decrypt, validFileProperties, saveRecipeImage, getRandomRecipes } = require('../functions');
const { featList } = require('../featuredRecipeList');
// dont use - within route names. Causes incorret/partial route name matching.




router.get('/page/:skip/:limit', async (req, res) => {
    console.log('recipePage');

    let skip = parseInt(req.params.skip);
    let limit = parseInt(req.params.limit);

    // once num of recipes exceeds limit pagination can become slow https://arpitbhayani.me/blogs/benchmark-and-compare-pagination-approach-in-mongodb
    try {
        var recipes = await Recipe
            .find()
            .limit(limit)
            .skip(skip)
            .sort({uploadDate: -1})
            .populate('authid', '_id name profileImg');
        if (!recipes) return res.status(400).send();

        // convert recipe to proper "object"
        var recipes = JSON.parse(JSON.stringify(recipes));
        // encrypt authid
        recipes.forEach((recipe, index, recipes) => {
            recipes[index].authid._id = encrypt(recipe.authid._id.toString());
        })

        return res.json(recipes);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('Server Error');
    }
});



router.get('/getbytitle/:title', async (req, res) => {
    console.log('getbytitle');
    try {
        var recipe = await Recipe.findOne({title: req.params.title}).select('-_id -__v -uploadDate -contactedAuthor').populate('authid', 'name profileImg');
        if (!recipe) return res.status(400).send('Server Error');

        var recipe = recipe.toJSON(); // turns mongoose "object" it into proper JSON YAY!

        // encypt id
        var authIdEncrypt = encrypt(recipe.authid._id.toString());
        //var encrypted = CryptoJS.AES.encrypt(recipe.authid._id.toString(), "Secret Passphrase");


        // append encrypt id
        recipe.authid._id = authIdEncrypt;

        return res.status(200).json(recipe);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('Server Error');
    }

    
})




// addiotnal feature to add... when empty search takse place, shuffle results so they're not always the same
router.post('/search', async (req, res) => {
    console.log('search')
    // build query
    var query = {};

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

    try {
        var recipes = await Recipe.find(query).populate('authid', '-_id name profileImg'); // will need to add pagination at some point...
        return res.status(200).json(recipes);
    }
    catch (err) {
        console.log(err);
        return res.status(400).send(err.message); 
    }

});







router.get('/search/auto', async (req, res) => {
    try {
        var recipes = await Recipe.find();
        return res.json(recipes);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({message: err.message});
    }
});






// router.get('/getbyuserid/:id', async (req, res) => {

//     const query = await Recipe.find({authid: req.params.id});

//     if (!query) {
//         res.status(404).json({msg: 'The course with given id was not found'});
//     } else {
//         res.status(200).json(query);
//     }

// });






router.get('/getrecent/', async (req, res) => {
    console.log('getrecent');
    try { 
        //.sort({uploadDate: -1});
        var recipes = await Recipe.find().limit(8).sort({uploadDate: -1}).populate('authid', 'name profileImg');
        if (!recipes) return res.status(400).send();

        // convert recipe to proper "object"
        var recipes = JSON.parse(JSON.stringify(recipes));
        // encrypt authid
        recipes.forEach((recipe, index, recipes) => {
            recipes[index].authid._id = encrypt(recipe.authid._id.toString());
        })

        return res.status(200).json(recipes);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json( {message: err.message} );
    }
    
});






router.get('/getfeatured/', async (req, res) => {
    console.log('getfeatured');
    try {
        // use ref and populate to link author data to recipe doc. This will prevent haveing to perform additional queries
        var recipes = await Recipe.find({
            '_id': { $in: featList }
            }).select('-__v').populate('authid', 'name profileImg'); 
        if (!recipes) return res.status(400).send();

        // convert recipe to proper "object"
        var recipes = JSON.parse(JSON.stringify(recipes));
        // encrypt authid
        recipes.forEach((recipe, index, recipes) => {
            recipes[index].authid._id = encrypt(recipe.authid._id.toString());
        })
        console.log(recipes);
        return res.status(200).json(recipes);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('Server Error');
    }
    
});



router.get('/getrandom/', async (req, res) => {
    console.log('getrandom');
    try {
        let recipes = await getRandomRecipes(8)
        return res.status(200).json(recipes);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('Server Error');
    }
    
});




router.post('/addnew', async (req, res) => {
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
        return res.status(201).json(saveRec);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({message: err.message}); 
    }

});









router.post('/upload', [verifyToken, upload.single('file'), validate_RecipeData], async (req, res) => {
    console.log('upload');

    // check for file
    if (typeof req.file == "undefined") return res.status(400).send('No recipe image');

    // check image file
    if (!validFileProperties(req.file.originalname, req.file.size)) {
        fs.unlinkSync(req.file.path);
        return res.status(400).send('Image file must be a .png or .jpg under 8MB');
    }

    // save file
    let fileName = await saveRecipeImage(req.body.title, req.file.path);
    if (fileName === false) return res.status(500).send('Server Error');

    // prep body
    req.body.title = req.body.title.trim();
    req.body.servings = req.body.servings.trim();
    req.body.description = req.body.description.trim();
    req.body.authid = req.tokenData._id; // append authId
    req.body.img = fileName;
   
    // save doc data
    try {
        const rec = new Recipe(req.body);
        await rec.save();
    }
    catch (err) {
        console.log(err);
        try {
            fs.unlinkSync("client/public/user_recipes_img/card/" + fileName);
            fs.unlinkSync("client/public/user_recipes_img/display/" + fileName);
            fs.unlinkSync("client/public/user_recipes_img/original/" + fileName);
        } catch (err) { console.log(err) }
        return res.status(400).send('Server Error');
    }

    return res.status(200).send();
});








router.post('/saveEdit', [verifyToken, upload.single('file'), validate_RecipeData], async (req, res) => {
    console.log('saveEdit');

    try {

        // if image file save to folders
        if (typeof req.file !== "undefined") {

            // valid file
            if (!validFileProperties(req.file.originalname, req.file.size)) { 
                try { fs.unlinkSync(req.file.path) }
                catch (err) { console.log(err) }
                return res.status(400).send('Image file must be a .png or .jpg under 8MB');
            }

            // save new img file to folder
            let fileName = await saveRecipeImage(req.body.title, req.file.path);
            if (fileName == false) return res.status(501).send('Server error');

            // append new img filename for doc
            req.body.img = fileName;

            // grab old img file name for deletion
            var oldRecipe = await Recipe.findOne({ _id: req.body.rid }).select('img');
        }

        req.body.title = req.body.title.trim();
        req.body.servings = req.body.servings.trim();
        req.body.description = req.body.description.trim();

        // update document 
        await Recipe.findOneAndUpdate({ _id: req.body.rid }, req.body, { runValidators: true });

        // delete old img files (if req.files was uploaded)
        if (typeof req.file !== "undefined") {
            try {
                fs.unlinkSync("client/public/user_recipes_img/card/" + oldRecipe.img);
                fs.unlinkSync("client/public/user_recipes_img/display/" + oldRecipe.img);
                fs.unlinkSync("client/public/user_recipes_img/original/" + oldRecipe.img);
            } catch (e) { console.log(e)}
        }

        return res.status(200).send(''); 
    }
    catch (err) {
        console.log(err);
        try {
            fs.unlinkSync("client/public/user_recipes_img/card/" + fileName);
            fs.unlinkSync("client/public/user_recipes_img/display/" + fileName);
            fs.unlinkSync("client/public/user_recipes_img/original/" + fileName);
        } catch (e) { console.log(e) }

        return res.status(500).send('Server Error');
    }
});





router.get('/getuserrecipesprivate', verifyToken, async (req, res) => {
    console.log('getuserrecipesprivate');
    try {
        let recipes = await Recipe.find({authid: req.tokenData._id}).select('-uploadDate -__v -contactedAuthor').populate('authid','name _id');
        if (!recipes) return res.status(400).send();

        // convert recipe to proper "object"
        recipes = JSON.parse(JSON.stringify(recipes));
        // encrypt authid
        recipes.forEach((recipe, index, recipes) => {
            recipes[index].authid._id = encrypt(recipe.authid._id.toString());
        })

        return res.status(200).json(recipes);
    }
    catch (err) { 
        console.log(err);
        return res.status(500).send();
    }
});


router.post('/getuserrecipespublic', async (req, res) => {
    console.log('getuserrecipespublic');
    try {
        var authId = decrypt(req.body.authid);
        if (!authId) return res.status(500).send();

        let recipes = await Recipe
            .find({ authid: authId })
            .select('-_id -contactedAuthor -reviewed -uploadDate -__v')
            .populate('authid','name profileImg _id');
        if (!recipes) return res.status(500).send();

        // convert recipe to proper "object"
        recipes = JSON.parse(JSON.stringify(recipes));
        // encrypt authid
        recipes.forEach((recipe, index, recipes) => {
            recipes[index].authid._id = encrypt(recipe.authid._id.toString());
        })

        return res.status(200).json(recipes);
    } 
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
});



router.post('/deleterecipe', [verifyToken], async (req, res) => {
    console.log('deleterecipe');
    try {
        await Recipe.deleteOne({_id: req.body.rid})
        return res.status(200).send('');
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('Server Error');
    }
})



router.get('/getedit/:editId', verifyToken, async (req, res) => {
    console.log('getedit');
    const recipe = await Recipe.findOne({ _id: req.params.editId }).select('-authid -uploadDate -__v -contactedAuthor');
    if (!recipe) res.status(500).send('Server Error');
    return res.status(200).json(recipe);
});




router.get('/getreview', verifyToken, async (req, res) => {
     console.log('getreview');
     //console.log(req.tokenData);

    if (!req.tokenData.admin) return res.status(401).send();

    try {
        const recipeData = await Recipe.find({reviewed: false}).populate('authid', 'name email -_id');
        return res.status(200).json(recipeData);
    }
    catch(err) {
        console.log(err);
        return res.status(500);
    }
    
});




router.post('/approve', verifyToken, async (req, res) => {
    console.log('approve');
    try {
        await Recipe.findOneAndUpdate(
            { title: req.body.title, authid: req.body.authid },  
            { reviewed: true });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('Server Error');
    }

   return res.status(200).send();
})


router.post('/getcookbanner', async (req,res) => {
     console.log('getcookbanner');
    try {
        let recipes = await getRandomRecipes(5, req.body.currentRecipe);
        return res.status(200).json(recipes);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('Server Error');
    }
    // const data = await Recipe.find({title: {$ne: req.body.currentRecipe}}).select('title img -_id').limit(5);
})




















module.exports = router;







