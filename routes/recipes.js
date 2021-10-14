

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const multer = require('multer');
const fs = require('fs');
const fsProm = require('fs').promises;

const { User, validateUser } = require('../models/users');
const Recipe = require('../models/recipes');
const { upload } = require('../middleware/upload');
const verifyToken = require('../middleware/verifyToken');
const validate_RecipeData = require('../middleware/validate_RecipeData');
const { encrypt, decrypt, validFileProperties, saveRecipeImage, getRandomRecipes } = require('../functions');
const { featList } = require('../featuredRecipeList');



router.get('/page/:skip/:limit', async (req, res) => {
  // note when pagination can become slow https://arpitbhayani.me/blogs/benchmark-and-compare-pagination-approach-in-mongodb
  let skip = parseInt(req.params.skip);
  let limit = parseInt(req.params.limit);
 
  try {
    var recipes = await Recipe
      .find({ 'reviewed': true })
      .limit(limit)
      .skip(skip)
      .sort({uploadDate: -1})
      .select('authid description img title -_id')
      .populate('authid', '_id name');

    console.log('recipePage results: ', recipes.length);

    if (!recipes) return res.status(400).send();
    if (recipes.length == 0) return res.status(200).json(recipes);
    var recipes = JSON.parse(JSON.stringify(recipes)); // get object properties
   
    recipes.forEach((recipe, index, recipes) => { // encrypt authid
        recipes[index].authid._id = encrypt(recipe.authid._id.toString());
    })

    return res.status(200).json(recipes);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error');
  }
});



router.get('/getbytitle/:title', async (req, res) => {
  try {
    var recipe = await Recipe
      .findOne({title: req.params.title})
      .select('-_id -__v -uploadDate -contactedAuthor')
      .populate('authid', 'name profileImg');
    if (!recipe) return res.status(400).send('Server Error');

    var recipe = recipe.toJSON();
    var authIdEncrypt = encrypt(recipe.authid._id.toString()); // encypt id
    recipe.authid._id = authIdEncrypt; // append encrypt id

    return res.status(200).json(recipe);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error');
  }  
})



router.post('/search', async (req, res) => {
  var query = {}; // build query
  query['reviewed'] = {$eq: true};

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
    query['$text'] = {$search: req.body.searchText}; // searchs fields specfied under Text Index on Mongo
  }

  try {
    var recipes = await Recipe
      .find(query)
      .select('cookTime description diet img title -_id');
    return res.status(200).json(recipes);
  } catch (err) {
    console.log(err);
    return res.status(400).send('Server Error'); 
  }
});




router.get('/search/auto', async (req, res) => {
  try {
    var recipes = await Recipe
      .find({ 'reviewed': true });
    return res.json(recipes);
  } catch (err) {
    console.log(err);
    return res.status(400).json({message: err.message});
  }
});




router.get('/getrecent/', async (req, res) => {
  try { 
    var recipes = await Recipe
      .find({ 'reviewed': true })
      .limit(8)
      .sort({uploadDate: -1})
      .select('authid description img title -_id')
      .populate('authid', 'name profileImg');
    if (!recipes) return res.status(400).send();
    
    var recipes = JSON.parse(JSON.stringify(recipes)); // get object properties

    recipes.forEach((recipe, index, recipes) => {
      recipes[index].authid._id = encrypt(recipe.authid._id.toString()); // encrypt authid
    })

    return res.status(200).json(recipes);
  } catch (err) {
      console.log(err);
      return res.status(500).json( {message: err.message} );
  }  
});






router.get('/getfeatured', async (req, res) => {
  try {
    var recipes = await Recipe
      .find({'_id': {$in: featList}})
      .select('authid description img title -_id')
      .populate('authid', '_id name');

    if (!recipes) return res.status(400).send();
    recipes = JSON.parse(JSON.stringify(recipes)); // get object properties
    
    recipes.forEach((recipe, index, recipes) => { 
        recipes[index].authid._id = encrypt(recipe.authid._id.toString()); // encrypt authid
    })

    return res.status(200).json(recipes);
  }
  catch (err) {
    console.log(err);
    return res.status(500).send('Server Error');
  }
});



router.get('/getrandom/', async (req, res) => {
  try {
    let recipes = await getRandomRecipes(8);
    return res.status(200).json(recipes);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error');
  }
});





router.post('/upload', [verifyToken, upload.single('file'), validate_RecipeData], async (req, res) => {
  if (typeof req.file == "undefined") return res.status(400).send('No recipe image'); // check for file
  
  if (!validFileProperties(req.file.originalname, req.file.size)) { // check image file
    fs.unlinkSync(req.file.path);
    return res.status(400).send('Image file must be a .png or .jpg under 8MB');
  }

  let fileName = await saveRecipeImage(req.body.title, req.file.path); // save file to directory folder
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
  } catch (err) {
    console.log(err);
    try {
      if (process.env.production == 'true') {
        fs.unlinkSync("../../mnt/volume1/user_recipes_img/card/" + fileName);
        fs.unlinkSync("../../mnt/volume1/user_recipes_img/display/" + fileName);
        fs.unlinkSync("../../mnt/volume1/user_recipes_img/original/" + fileName);
        fs.unlinkSync("../../mnt/volume1/tmp_upload/" + fileName);
      } else {
        fs.unlinkSync("../client/public/user_recipes_img/card/" + fileName);
        fs.unlinkSync("../client/public/user_recipes_img/display/" + fileName);
        fs.unlinkSync("../client/public/user_recipes_img/original/" + fileName);
        fs.unlinkSync("../client/tmp_upload/" + fileName);
      }
    } catch (err) { 
      console.log(err) 
    }
    return res.status(400).send('Server Error');
  }

  // check that file tmp_upload was removed
  try { 
    fs.unlinkSync(req.file.path); 
  } catch (err) { 
    console.log(err); 
  }
  return res.status(200).send();
});








router.post('/saveEdit', [verifyToken, upload.single('file'), validate_RecipeData], async (req, res) => {
  try {
    if (typeof req.file !== "undefined") {  // if image file save to folders
      // valid file
      if (!validFileProperties(req.file.originalname, req.file.size)) { 
          try { fs.unlinkSync(req.file.path) }
          catch (err) { console.log(err) }
          return res.status(400).send('Image file must be a .png or .jpg under 8MB');
      }

      let fileName = await saveRecipeImage(req.body.title, req.file.path); // save new img file to folder
      if (fileName == false) return res.status(501).send('Server error');
      req.body.img = fileName; // append new img filename for doc
      req.body.reviewed = false; // require review on img change
      var oldRecipe = await Recipe.findOne({ _id: req.body.rid }).select('img'); // grab old img file name for deletion
    }

    req.body.title = req.body.title.trim();
    req.body.servings = req.body.servings.trim();
    req.body.description = req.body.description.trim();
    
    await Recipe.findOneAndUpdate({ _id: req.body.rid }, req.body, { runValidators: true }); // update document 

    // delete old img files (if req.files was uploaded)
    if (typeof req.file !== "undefined") {
      try {
        if (process.env.production == 'true') {
          fs.unlinkSync("../../mnt/volume1/user_recipes_img/card/" + oldRecipe.img);
          fs.unlinkSync("../../mnt/volume1/user_recipes_img/display/" + oldRecipe.img);
          fs.unlinkSync("../../mnt/volume1/user_recipes_img/original/" + oldRecipe.img);
        } else {
          fs.unlinkSync("../client/public/user_recipes_img/card/" + oldRecipe.img);
          fs.unlinkSync("../client/public/user_recipes_img/display/" + oldRecipe.img);
          fs.unlinkSync("../client/public/user_recipes_img/original/" + oldRecipe.img);
        }
      } catch (e) { 
        console.log(e);
      }
    }
    return res.status(200).send(''); 
  } catch (err) {
    console.log(err);
    try {
      if (process.env.production == 'true') {
        fs.unlinkSync("../../mnt/volume1/user_recipes_img/card/" + filename);
        fs.unlinkSync("../../mnt/volume1/user_recipes_img/display/" + filename);
        fs.unlinkSync("../../mnt/volume1/user_recipes_img/original/" + filename);
      } else {
        fs.unlinkSync("../client/public/user_recipes_img/card/" + filename);
        fs.unlinkSync("../client/public/user_recipes_img/display/" + filename);
        fs.unlinkSync("../client/public/user_recipes_img/original/" + filename);
      }
    } catch (e) { 
      console.log(e);
    }
    return res.status(500).send('Server Error');
  }
});





router.get('/getuserrecipesprivate', verifyToken, async (req, res) => {
  try {
    let recipes = await Recipe.find({authid: req.tokenData._id})
      .select('authid description img reviewed title')
      .populate('authid','name _id');

    if (!recipes) return res.status(400).send();

    recipes = JSON.parse(JSON.stringify(recipes)); // get object properties
    
    recipes.forEach((recipe, index, recipes) => { 
        recipes[index].authid._id = encrypt(recipe.authid._id.toString()); // encrypt authid
    })

    return res.status(200).json(recipes);
  }
  catch (err) { 
      console.log(err);
      return res.status(500).send();
  }
});


router.post('/getuserrecipespublic', async (req, res) => {
  try {
    var authId = decrypt(req.body.authid);
    if (!authId) return res.status(500).send();

    let recipes = await Recipe.find({ authid: authId })
        .select('authid description img title -_id')
        .populate('authid','name profileImg _id');
    if (!recipes) return res.status(500).send();

    recipes = JSON.parse(JSON.stringify(recipes)); // get object properties
    
    recipes.forEach((recipe, index, recipes) => {
        recipes[index].authid._id = encrypt(recipe.authid._id.toString());// encrypt authid
    })

    return res.status(200).json(recipes);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});



router.post('/deleterecipe', [verifyToken], async (req, res) => {
  try {
    //get ID
    let recipe = await Recipe.findOne({_id: req.body.rid}).select('img');
    // remove from mongoDB
    await Recipe.deleteOne({_id: req.body.rid})
    // remove file image (using ID)
    if (process.env.production == 'true') {
      fs.unlinkSync("../../mnt/volume1/user_recipes_img/card/" + recipe.img);
      fs.unlinkSync("../../mnt/volume1/user_recipes_img/display/" + recipe.img);
      fs.unlinkSync("../../mnt/volume1/user_recipes_img/original/" + recipe.img);
    } else {
      fs.unlinkSync("../client/public/user_recipes_img/card/" + recipe.img);
      fs.unlinkSync("../client/public/user_recipes_img/display/" + recipe.img);
      fs.unlinkSync("../client/public/user_recipes_img/original/" + recipe.img);
    }

    return res.status(200).send();
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error');
  }
})



router.get('/getedit/:editId', verifyToken, async (req, res) => {
  const recipe = await Recipe.findOne({ _id: req.params.editId }).select('-authid -uploadDate -__v -contactedAuthor');
  if (!recipe) res.status(500).send('Server Error');
  return res.status(200).json(recipe);
});




router.get('/getreview', verifyToken, async (req, res) => {
  if (!req.tokenData.admin) return res.status(401).send();

  try {
    let recipes = await Recipe.find({reviewed: false})
      .select('authid title _id uploadDate contactedAuthor');

    recipes = JSON.parse(JSON.stringify(recipes));  // get object properties

    recipes.forEach((recipe, index, recipes) => {   
        recipes[index].authid = encrypt(recipe.authid.toString()); // encrypt authid
    })

    return res.status(200).json(recipes);
  } catch(err) {
    console.log(err);
    return res.status(500);
  }
    
});




router.post('/approve', verifyToken, async (req, res) => {
  try {
    await Recipe.findOneAndUpdate({_id: req.body.rid}, {reviewed: true});
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error');
  }
  return res.status(200).send();
})





router.post('/getcookbanner', async (req,res) => {
  try {
    let recipes = await getRandomRecipes(5, req.body.currentRecipe);
    return res.status(200).json(recipes);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error');
  }
  // const data = await Recipe.find({title: {$ne: req.body.currentRecipe}}).select('title img -_id').limit(5);
})






module.exports = router;







