const { User } = require('../models/users');
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateEmail, validatePwd } = require('../serverFiles/validation');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

var { upload } = require('../middleware/upload');
var path = require('path');
const multer = require('multer');
const fs = require('fs');
const mv = require('mv');


// API //
//.  /api/users/register
//.  /api/users/login


router.post('/register', async (req, res) => {

    // check valid password
    if ( !validatePwd(req.body.pwd, req.body.pwdRepeat) ) return res.status(400).json({error: 'Passwords must match, and be at least 8 characters'});

    // check email is valid
    const valid = validateEmail(req.body.email);
    if ( !valid ) return res.status(400).json({error: 'Invalid email'});

    // check if user already exists (i.e unique email)
    let check = await User.findOne({email: req.body.email});
    if ( check ) return res.status(400).json({error: 'User already registered'});

    // encypt pwd using bcrypt library
    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(req.body.pwd, salt);

    // save user
    const user = new User({
        email: req.body.email,
        pwd: hashPwd
    });

    await user.save().catch(error => res.status(500).json({error: error}));

    // return
    return res.status(200).json({msg: 'Registered User'});
});









router.post('/login', async (req, res) => {
    //console.log(req.headers.cookie['jwt']);
    // find user by email
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).json({error: 'Invalid email / password'});
    // compare passwords
    const pwdCheck = await bcrypt.compare(req.body.password, user.pwd);
    if (!pwdCheck) return res.status(400).json({error: 'Invalid email / password'});
    // gen web token
    const token = user.generateAuthToken();
    // cookies res.setHeader('Set-cookie', <one string contains all attriubtes seperated by ; > )
    // res.setHeader('Set-Cookie', 'jwt=' + token + '; HttpOnly').status(200).json({log: true});
    // res.setHeader('Set-Cookie', 'jwt=' + token).status(200).json({log: true});
    res.setHeader('Set-Cookie', 'jwt=' + token + '; Path=/api').status(200).json({log: true});

})
// TASK
// set jwt to expire after 24 hours. then redirect user to re login on authentication



router.post('/change-password', verifyToken, async (req, res) => {

    if (req.body.newPwd !== req.body.newPwdRepeat) return res.status(400).json({error: 'Passwords do not match'});
    // find user
    const user = await User.findOne({_id: req.tokenData._id});
    if (!user) return res.status(500).json({error: 'error'});
    // validate password
    const pwdCheck = await bcrypt.compare(req.body.oldPwd, user.pwd);
    if (!pwdCheck) return res.status(400).json({error: 'Old password is incorrect'});
    // encypt pwd using bcrypt library
    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(req.body.newPwd, salt);
    // update
    User.findOneAndUpdate({_id: req.tokenData._id}, {pwd: hashPwd}, (err) => {
        if (err) return res.status(500).json({err: 'server error'});
        return res.json({msg: 'User password updated!'});
    });

})





 var validUrl = require('valid-url');


router.post('/update-profile', [verifyToken, upload.single('file')], async (req, res) => {


    
    // upload photo file and update user profile to reflec new profileImg
    if (typeof req.file !== "undefined") {

        var extension = path.extname(req.file.originalname).toLowerCase();
        var profileImg_new = req.body.name.replace(/\s/g,'_') + '_' + Date.now() + extension;
        var tempPath = path.join(req.file.path);
        var targetPath = path.join("client", "public", "user_profile_img", profileImg_new);
        // check file size
        if (req.file.size >= 8000000) {
            fs.unlink(tempPath, err => console.log(err));
            return res.status(400).json({error: 'File size too large. Must be less than 8 MB.'});
        }
        // check extension
        if (!(extension == ".png" || extension == ".jpg" || extension == ".jpeg")) {
            fs.unlink(tempPath, err => console.log(err));
            return res.status(400).json({error: 'File must be .png or .jpg'});
        }
        // move file from tmp dir to permenant dir
        mv(tempPath, targetPath, function (err) {
            if (err) console.log(err);
        });
        // query user data for old profileImg
        var user = await User.findOne({_id: req.tokenData._id});
        if (!user) {
            fs.unlink(targetPath, err => console.log(err));
            return res.status(500).json({error: 'no user found'});
        }
        var oldProfileImg_path = "client/public/user_profile_img/" + user.profileImg;
        // update user data (new profileImg)
        await User.findOneAndUpdate(
            {_id: req.tokenData._id}, 
            {profileImg: profileImg_new}, 
            function (err) {
                if (err) {
                    fs.unlink(targetPath, err => console.log(err));
                    return res.status(500).json({error: err.message});
                }
            }
        );
        // delete old profileImg
        fs.unlink(oldProfileImg_path, err => { return null });
        
    }



    // Update user data

    // find user
    var user = await User.findOne({_id: req.tokenData._id});
    if (!user) {
        return res.status(500).json({error: 'no user found'});
    }


    // // validate body
    // const socialLinks = {};
    // socialLinks.tw = req.body.tw;
    // socialLinks.insta = req.body.insta;
    // socialLinks.yt = req.body.yt;
    // socialLinks.fb = req.body.fb;
    // socialLinks.web = req.body.web;
    // // check valid URL
    // for ( link in socialLinks ) {
    //     if ( socialLinks[link].length > 0 ) {
    //         if ( !validUrl.isUri(socialLinks[link]) ) return res.status(400).json({error: 'Bad link: ' + socialLinks[link]});
    //     }
    // }
    // req.body.socialLinks = socialLinks;



    // update user data
    await User.findOneAndUpdate(
        {_id: req.tokenData._id}, 
        req.body, 
        {new: true, runValidators: true}, 
        function (err) {
            if (err) return res.status(500).json({error: err.message});
        }
    );

    // return updated user data
    var updatedUser = await User.findOne({_id: req.tokenData._id}, '-pwd -_id -admin');
    return res.status(200).json(updatedUser);

})





router.get('/get-profile-data', verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({_id: req.tokenData._id}, '-pwd -_id -admin');
        return res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json(error);
    }
})


// router.get('/get-profile-img', verifyToken, async (req, res) => {
//     try {
//         const user = await User.findOne({_id: req.tokenData._id}, 'profileImg');
//         return res.sendFile(path.join(__dirname,'../client/public/user_profile_img/', user.profileImg), function (err) { if (err) console.log(err); });
//     }
//     catch (error) {
//         res.status(500).json(error);
//     }
// })













module.exports = router;


