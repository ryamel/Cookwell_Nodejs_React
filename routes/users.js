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

    user.save()
        .then(result => console.log(result))
        .catch(error => res.status(500).json({error: error}));

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
    res.setHeader('Set-Cookie', 'jwt=' + token).status(200).json({log: true});

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








router.post('/update-profile', [verifyToken, upload.single('file')], async (req, res) => {
    
    // validate file and place into temp folder
    if (typeof req.file !== "undefined") {

        console.log(req.body);
        console.log(req.file);

        const proileImg = req.body.name.replace(/\s/g,'_') + '_' + Date.now();
        const extension = path.extname(req.file.originalname).toLowerCase();
        // const tempPath = path.join(__dirname, "client", "public", "test_upload", 'file_1624347088180.png'); // req.file.filename
        // const targetPath = path.join(__dirname, "client", "public", "user_profile_img", 'file_1624347088180.png');// req.file.filename


        fs.renameSync('file_1624354135900.png', 'test.png', function (err) {
            if (err) {
                console.log(err);
                //fs.unlink(tempPath, err => console.log(err));
                //return res.status(500).json({error: 'Server error'});
            }
        });

        return null;

        if (req.file.size >= 8000000) {
            await fs.unlink(tempPath, err => console.log(err));
            return res.status(400).json({error: 'File size too large. Must be less than 8 MB.'});
        }

        if (!(extension == ".png" || extension == ".jpg" || extension == ".jpeg")) {
            await fs.unlink(tempPath, err => console.log(err));
            return res.status(400).json({error: 'File must be .png or .jpg'});
        }

        // save img to permanent folder
        fs.renameSync(tempPath, targetPath, function (err) {
            if (err) {
                console.log(err);
                //fs.unlink(tempPath, err => console.log(err));
                //return res.status(500).json({error: 'Server error'});
            }
        });

        // append img name
        req.body.proileImg = proileImg;

        console.log(req.body)
        return null;
    }

    
    // update user data

    // find user
    const user = await User.findOne({_id: req.tokenData._id});
    if (!user) return res.status(500).json({error: 'no user found'});

    // update user data
    await User.findOneAndUpdate({_id: req.tokenData._id}, req.body, {new: true} );

    // return updated user data
    const updatedUser = await User.findOne({_id: req.tokenData._id}, '-pwd -_id -admin');
    return res.status(200).json(updatedUser);


    console.log(req.body)
    return null;

    // catch (error) {
    //     fs.unlink(tempPath, err => console.log(err));
    //     res.json({error: error});
    // }


    // delete old user profile img file
})


router.get('/get-profile', verifyToken, async (req, res) => {
    try {
        // find user
        const user = await User.findOne({_id: req.tokenData._id}, '-pwd -_id -admin');
        return res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json(error);
    }
})
















module.exports = router;


