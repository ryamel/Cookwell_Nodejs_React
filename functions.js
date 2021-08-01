
const CryptoJS = require("crypto-js");
const Recipe = require('./models/recipes');
const User = require('./models/users');
var path = require('path');
const fs = require('fs');
const fsProm = require('fs').promises;
const sharp = require('sharp');



const decrypt = function(string) {
	try {
    	var decryptObj = CryptoJS.AES.decrypt(string, process.env.encryptKey);
    	return decryptObj.toString(CryptoJS.enc.Utf8);
    }
    catch (err) {
    	console.log(err);
    	return null;
    }
}

const encrypt = function(string) {
	try {
		var encryptedObj = CryptoJS.AES.encrypt(string, process.env.encryptKey);
		return encryptedObj.toString();
	}
	catch (err) {
		console.log(err);
		return null;
	}
}


const validFileProperties = function(fileName, fileSize) {
    let extension = path.extname(fileName).toLowerCase();
    if (!(extension == ".png" || extension == ".jpg" || extension == ".jpeg")) return false;// check extension
    if (fileSize >= 10000000) return false;// check file size (10 MB)
    return true;
}


const saveRecipeImage = async function(giveName, filePath) {
    // returns image name
    // save original and compressed images. Note: sharp is a good library for resizing and compressing
    try {
        let extension = path.extname(filePath).toLowerCase();
        var fileName = giveName.replace(/\s/g,"_").replace(/[\\\.\+\*\?\^\$\,\[\]\{\}\|<>#%!`&'"=:@~;()]/g, '') + '_' + Date.now() + extension;
        var savePath_orig = path.join("client", "public", "user_recipes_img", "original", fileName);
        var savePath_card = path.join("client", "public", "user_recipes_img", "card", fileName);
        var savePath_disp = path.join("client", "public", "user_recipes_img", "display", fileName);

        // save original
        await fsProm.copyFile(filePath, savePath_orig);

        sharp(filePath)
            .resize(250, 250, {fit: 'outside'}) // width, height (pixels)
            .jpeg({ quality: 100 })
            .toFile(savePath_card);

        sharp(filePath)
            .resize(500, 500, {fit: 'outside'}) // width, height (pixels)
            .jpeg({ quality: 100 })
            .toFile(savePath_disp);

        return fileName;
    }
    catch (err) { 
        console.log('Error trying to save image: ');
        try {
            fs.unlinkSync(filePath);
            fs.unlinkSync(savePath_orig);
            fs.unlinkSync(savePath_disp);
            fs.unlinkSync(savePath_card);
        } 
        catch (e) { 
            console.log('Warning, Error trying to unlinkSync'); // dont worry if this throws, my mean on of the paths did not exist 
        }
        return false;
    }
}

const saveUserImage = async function(giveName, filePath) {
    // returns image name
    // save original and compressed images. Note: sharp is a good library for resizing and compressing

    try {
        let extension = path.extname(filePath).toLowerCase();
        var fileName = giveName.replace(/\s/g,"_").replace(/[\\\.\+\*\?\^\$\,\[\]\{\}\|<>#%!`&'"=:@~;()]/g, '') + '_' + Date.now() + extension;
        var savePath_orig = path.join("client", "public", "user_profile_img", "original", fileName);
        var savePath_card = path.join("client", "public", "user_profile_img", "card", fileName);
        var savePath_thumb = path.join("client", "public", "user_profile_img", "thumb", fileName);

        // save original
        await fsProm.copyFile(filePath, savePath_orig);

        sharp(filePath)
            .resize(250, 250, {fit: 'outside'}) // width, height (pixels)
            .jpeg({ quality: 100 })
            .toFile(savePath_card);

        sharp(filePath)
            .resize(30, 30, {fit: 'outside'}) // width, height (pixels)
            .jpeg({ quality: 100 })
            .toFile(savePath_thumb);

        return fileName;
    }
    catch (err) { 
        console.log('Error trying to save image: ');
        try {
            fs.unlinkSync(filePath);
            fs.unlinkSync(savePath_orig);
            fs.unlinkSync(savePath_card);
            fs.unlinkSync(savePath_thumb);
        } 
        catch (e) { 
            console.log('Warning, Error trying to unlinkSync'); // dont worry if this throws, my mean on of the paths did not exist 
        }
        return false;
    }
}


const getRandomRecipes = async function(ndocs, recipeName_ex = null) {
    // ndocs: number of random docs to return
    // recipeName_ex: exclude any recipes from search
    try {
        const date = Date.now() - 1210000000; // ignore recipes made in the last 2 weeks ( 1,210,000,000ms ) // uploadDate: { $lt: date } bug
        if (typeof recipeName_ex === null) {
            var recipes = await Recipe.find({})
                .select('-__v -_id')
                .populate('authid', 'name profileImg'); 
            if (recipes.length < 1) return [];
        } else {
            var recipes = await Recipe.find({title: {$ne: recipeName_ex} })
                .select('-__v -_id')
                .populate('authid', 'name profileImg'); 
            if (recipes.length < 1) return [];
        }

        // generate array of #ndoc random, unique, numbers. Ranging between 1 - recipe.count
        let count = recipes.length;
        let ranRecipes = [];
        let num = Math.floor(Math.random() * count);
        for (var i = 0; i < ndocs; i++) {
            while (ranRecipes.includes(num)) num = Math.floor(Math.random() * count);
            ranRecipes[i] = num;
        }
        // load array with recipes
        for (var i = 0; i < ranRecipes.length; i++) {
            ranRecipes[i] = recipes[ranRecipes[i]];
        }

        // convert ranRecipes to proper "object"
        ranRecipes = JSON.parse(JSON.stringify(ranRecipes));
        // encrypt authid
        ranRecipes.forEach((recipe, index, ranRecipes) => {
            ranRecipes[index].authid._id = encrypt(recipe.authid._id.toString());
        })

        // return recipes
        return ranRecipes;
    }
    catch (err) {
        console.log(err);
        return [];
    }
}


const validatePwd = function(pwd, pwdRepeat) {
	if (pwd !== pwdRepeat) return 'Passwords do not match';
	if (pwd.length < 8) return 'Password must be at least 8 characters';
	return null;
}



function validateEmail(mail) {
	if ( /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail) ) {
		return (true);
	} else {
		return (false);
	}
}







exports.getRandomRecipes = getRandomRecipes;
exports.saveUserImage = saveUserImage;
exports.saveRecipeImage = saveRecipeImage;
exports.validFileProperties = validFileProperties;
exports.encrypt = encrypt;
exports.decrypt = decrypt;
exports.validatePwd = validatePwd;
exports.validateEmail = validateEmail;




