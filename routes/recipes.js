const express = require('express');
const router = express.Router();

const mogoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mv = require('mv');

const { User, validateUser } = require('../models/users');
const Recipe = require('../models/recipes');
const { upload } = require('../middleware/upload');
const verifyToken = require('../middleware/verifyToken');
const validate_RecipeData = require('../middleware/validate_RecipeData');











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



router.get('/getbytitle/:title', async (req, res) => {
    //return res.status(500).send('Server Error');
    try {
        const recipe = await Recipe.findOne({title: req.params.title}).select('-_id -__v -uploadDate').populate('authid', '-_id name profileImg');
        if (!recipe) return res.status(400).send('Server Error');
        return res.status(200).json(recipe);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('Server Error');
    }

    
})




// addiotnal feature to add... when empty search takse place, shuffle results so they're not always the same
router.post('/search', async (req, res) => {
    console.log('run');
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
        return res.status(400).send(err.message); 
    }

});






// router.post('/text-search', async (req, res) => {   
//     if (req.body.search.length !== 0) {
//         var query = { $text: { $search: req.body.search } };
//     } else {
//         var query = {};
//     }

//     try {   
//         var recipes = await Recipe.find(query); // will need to add pagination at some point...
//         return res.status(200).json(recipes);
//     }
//     catch (err) {
//         return res.status(500).send(err.message); 
//     }

// });






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
        //.sort({uploadDate: -1});
        var recipes = await Recipe.find().limit(8).sort({uploadDate: -1}).populate('authid', '-_id name profileImg');
        return res.json(recipes);
    }
    catch (err) {
        return res.status(500).json( {message: err.message} );
    }
    
});






router.get('/get-featured/', async (req, res) => {
    try {
        // use ref and populate to link author data to recipe doc. This will prevent haveing to perform additional queries
        var recipes = await Recipe.find().limit(8).select('-__v').populate('authid', '-_id name profileImg'); 
        return res.json(recipes);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
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









router.post('/upload', [verifyToken, upload.single('file'), validate_RecipeData], async (req, res) => {


    ////// validate recipe image ///////
    if (typeof req.file == "undefined") {
        return res.status(400).send('No recipe image');
    }

    var extension = path.extname(req.file.originalname).toLowerCase();
    var profileImg_new = req.body.title.replace(/\s/g,'_') + '_' + Date.now() + extension;

    req.body.img = profileImg_new;

    var tempPath = path.join(req.file.path);
    var targetPath = path.join("client", "public", "user_recipes_img", profileImg_new);

    // check file size
    if (req.file.size >= 8000000) {
        fs.unlink(tempPath, err => console.log(err));
        return res.status(400).send('File size too large. Must be less than 8 MB.');
    }

    // check extension
    if (!(extension == ".png" || extension == ".jpg" || extension == ".jpeg")) {
        fs.unlink(tempPath, err => console.log(err));
        return res.status(400).send('File must be .png or .jpg');
    }

    // move file from tmp dir to permenant dir
    mv(tempPath, targetPath, function (err) {
        if (err) {
            console.log(err);
            return res.status(500).send('Server error');
        }
    });


    //  append authId
    req.body.authid = req.tokenData._id;
    

    ////// save ///////
    try {
        const recipe = new Recipe(req.body);
        await recipe.save();
        return res.status(200).send('success');
    } catch (err) {
        if (typeof req.file !== "undefined") { fs.unlink(targetPath, (err) => {if (err) console.log(err)}); }
        //let errors = Object.values(err.errors).map(el => el.message);
        return res.status(400).send('There was an unkown error');
    }

});










router.post('/save-edit', [verifyToken, upload.single('file'), validate_RecipeData], async (req, res) => {

    // if file exists upload file
    if (typeof req.file !== "undefined") {

        var extension = path.extname(req.file.originalname).toLowerCase();
        var fileName_new = req.body.title.replace(/\s/g,'_') + '_' + Date.now() + extension;
        var tempPath = path.join(req.file.path);
        var targetPath = path.join("client", "public", "user_recipes_img", fileName_new);
        // check file size
        if (req.file.size >= 8000000) {
            fs.unlink(tempPath, err => console.log(err));
            return res.status(400).send('File size too large. Must be less than 8 MB.');
        }
        // check extension
        if (!(extension == ".png" || extension == ".jpg" || extension == ".jpeg")) {
            fs.unlink(tempPath, err => console.log(err));
            return res.status(400).send('File must be .png or .jpg');
        }
        // get old img name of recipe (for deletion)
        var oldRecipe = await Recipe.findOne({title: req.body.titleOriginal, authid: req.tokenData._id}).select('img -_id');
        
        oldRecipe_img = oldRecipe.img;
        var oldRecipe_img_path = "client/public/user_recipes_img/" + oldRecipe_img;

        if (!oldRecipe_img) {
            fs.unlink(tempPath, err => console.log(err));
            return res.status(500).send('no recipe found');
        }
        // move file from tmp dir to permenant dir
        mv(tempPath, targetPath, function (err) {
            if (err) console.log(err);
        });
        // update recipe (new img)
        await Recipe.findOneAndUpdate(
            { authid: req.tokenData._id, title: req.body.titleOriginal }, 
            { img: fileName_new }, 
            function (err) {
                if (err) {
                    fs.unlink(targetPath, err => console.log(err));
                    return res.status(500).send(err.message);
                }
            }
        );
        // delete old profileImg
        fs.unlink(oldRecipe_img_path, err => { return null });
    }


    // // parse json objects (arrays and objects)
    // req.body.diet = JSON.parse(req.body.diet);
    // req.body.cuisine = JSON.parse(req.body.cuisine);
    // req.body.ingredients = JSON.parse(req.body.ingredients);
    // req.body.method = JSON.parse(req.body.method);
    // req.body.notes = JSON.parse(req.body.notes);


    // find and update with body request
    const recipe_updated = await Recipe.findOneAndUpdate(
        {
            title: req.body.titleOriginal,
            authid: req.tokenData._id
        }, 
        req.body, 
        {
            new: true, 
            runValidators: true
        }, 
        function (err) { 
            if (err) {
                console.log(err.message);
                return res.status(500);
            }
        }
    );

    if (!recipe_updated) res.status(400).send('No recipe found');

    //send back updated data for state
    res.status(200).json(recipe_updated);
});










router.get('/get-user-recipes', verifyToken, async (req, res) => {
    const recipes = await Recipe.find({authid: req.tokenData._id});
    res.status(200).json(recipes);
});








router.post('/delete-recipe', [verifyToken], async (req, res) => {

    Recipe.deleteOne({authid: req.tokenData._id, title: req.body.title})
    .then(res.status(200).json({msg: 'success'}))
    .catch(err => res.status(500).json({error: err}));

    //res.status(200).json({msg: 'success'});
})



router.get('/get-edit/:recipeName', verifyToken, async (req, res) => {
    // req.tokenData._id
    const recipe = await Recipe.findOne({authid: req.tokenData._id, title: req.params.recipeName}).select('-authid -uploadDate -__v -_id');
    if (!recipe) res.status(400).json({error: 'No recipe found'});

    res.status(200).json(recipe);

});




router.get('/get-review', verifyToken, async (req, res) => {
    if (!req.tokenData.admin) return res.status(401).send();

    try {
        const recipeData = await Recipe.find({reviewed: false}).populate('authid', 'name email');
        return res.status(200).json(recipeData);
    }
    catch(err) {
        console.log(err);
    }
    return res.status(500);
});




router.post('/approve', verifyToken, async (req, res) => {
    await Recipe.findOneAndUpdate(
        { title: req.body.title, authid: req.body.authid },  
        { reviewed: true }, 
        function (err) {
            if (err) return res.status(500).send('Server Error');
        });

    return res.status(200).send('wors');
})



module.exports = router;







