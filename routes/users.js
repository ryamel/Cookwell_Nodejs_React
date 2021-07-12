

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var path = require('path');
const multer = require('multer');
const fs = require('fs');
const mv = require('mv');

const { validateEmail } = require('../serverFiles/validation');
const { User } = require('../models/users');
var { upload } = require('../middleware/upload');
const verifyToken = require('../middleware/verifyToken');
const { validatePwd } = require('../middleware/validatePwd');





// const cookieParser = require('cookie-parser');
// const app = express();
// app.use(cookieParser());
//app.use(express.urlencoded({extended: true}));













// API //
//.  /api/users/register
//.  /api/users/login


// TASK
// set jwt to expire after 24 hours. then redirect user to re login on authentication


router.post('/register', async (req, res) => {
    // check if email is already taken (i.e unique email)
    let check = await User.findOne({email: req.body.email});
    if ( check ) return res.status(400).send('That email is alredy being used');
    // check email is valid
    const valid = validateEmail(req.body.email);
    if ( !valid ) return res.status(400).send('Invalid email');
    // check valid password
    let err = validatePwd(req.body.pwd, req.body.pwdRepeat);
    if (err) return res.status(400).send(err);
    // encypt pwd using bcrypt library
    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(req.body.pwd, salt);
    // save user
    const user = new User({
        email: req.body.email,
        pwd: hashPwd
    });
    await user.save().catch(error => res.status(500).send('Server Error'));
    // login user (provide jwt)
    const token = user.generateAuthToken();
    return res.status(200).setHeader('Set-Cookie', 'jwt=' + token + '; Path=/api').send('User Registered'); 

});









router.post('/login', async (req, res) => {
    try {
        // find user by email
        const user = await User.findOne({email: req.body.email});
        if (!user) return res.status(400).send('Invalid email / password');
        // compare passwords
        const pwdCheck = await bcrypt.compare(req.body.password, user.pwd);
        if (!pwdCheck) return res.status(400).send('Invalid email / password');
        // gen web token
        const token = user.generateAuthToken();
        return res.status(200).setHeader('Set-Cookie', 'jwt=' + token + '; Path=/api').send(); // cookies res.setHeader('Set-cookie', <one string contains all attriubtes seperated by ; > )
    }
    catch (err) {
        return res.status(500).send();
    }

})








router.post('/change-password', verifyToken, async (req, res) => {
    //console.log(req.body);

    if (req.body.newPwd !== req.body.newPwdRepeat) return res.status(400).send('Passwords do not match');
    // find user
    const user = await User.findOne({_id: req.tokenData._id});
    if (!user) return res.status(500).send('error');
    // validate password
    const pwdCheck = await bcrypt.compare(req.body.oldPwd, user.pwd);
    if (!pwdCheck) return res.status(400).send('Old password is incorrect');
    // encypt pwd using bcrypt library
    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(req.body.newPwd, salt);
    // update
    User.findOneAndUpdate({_id: req.tokenData._id}, {pwd: hashPwd}, (err) => {
        if (err) return res.status(500).send('server error');
        return res.status(200).send('User password updated!');
    });

})





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
            return res.status(400).send('File size too large. Must be less than 8 MB.');
        }
        // check extension
        if (!(extension == ".png" || extension == ".jpg" || extension == ".jpeg")) {
            fs.unlink(tempPath, err => console.log(err));
            return res.status(400).send('File must be .png or .jpg');
        }
        // move file from tmp dir to permenant dir
        mv(tempPath, targetPath, function (err) {
            if (err) console.log(err);
        });
        // query user data for old profileImg
        var user = await User.findOne({_id: req.tokenData._id});
        if (!user) {
            fs.unlink(targetPath, err => console.log(err));
            return res.status(500).send('No User Found');
        }
        var oldProfileImg_path = "client/public/user_profile_img/" + user.profileImg;
        // update user data (new profileImg)
        await User.findOneAndUpdate(
            {_id: req.tokenData._id}, 
            {profileImg: profileImg_new}, 
            function (err) {
                if (err) {
                    fs.unlink(targetPath, err => console.log(err));
                    return res.status(500).send('Server Error');
                }
            }
        );
        // delete old profileImg
        fs.unlink(oldProfileImg_path, err => { return null });
    }


    /// validate data ///
    let obj = JSON.parse(JSON.stringify(req.body)); // work around object null prototype
    if (obj.name.length < 3) return res.status(400).send('Username must be at least 3 characters');
    if (obj.about.length >= 500) return res.status(400).send('About section must be less than 500 characters');
    if (obj.email.length < 5) return res.status(400).send('A valid email is required');

    // send email to new user address

    // find user and update 
    var user = await User.findOneAndUpdate(
        {_id: req.tokenData._id}, 
        req.body, 
        {new: true, runValidators: true}, 
        function (err) {
            if (err) return res.status(500).send('Server Error');
        }
    );
    if (!user) return res.status(500).send('No User Found');
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
        res.status(500).send('Server Error');
    }
})












module.exports = router;


