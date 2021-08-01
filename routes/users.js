const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var path = require('path');
const multer = require('multer');
const fs = require('fs');
const mv = require('mv');
const dayjs = require('dayjs');

const { User } = require('../models/users');
var { upload } = require('../middleware/upload');
const verifyToken = require('../middleware/verifyToken');
const { encrypt, decrypt, saveUserImage, validFileProperties, validatePwd, validateEmail} = require('../functions');



// TASK
// set jwt to expire after 24 hours. then redirect user to re login on authentication
// send email to new user address when updated email



router.post('/register', async (req, res) => {
    try {
        // check if email is already taken (i.e unique email)
        let check = await User.findOne({email: req.body.email});
        if (check) return res.status(400).send('That email is alredy being used');

        // check email is valid
        const valid = validateEmail(req.body.email);
        if (!valid) return res.status(400).send('Invalid email');

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

        // register
    	await user.save();
        // login user by setting jwt
        const token = user.generateAuthToken();
        return res.status(200).setHeader('Set-Cookie', 'jwt=' + token + '; Path=/api').send();  // only use this method to set cookies (cookie-parser)
    }
    catch(error) { 
    	console.log(error);
    	return res.status(500).send('Server Error'); 
    }
});









router.post('/login', async (req, res) => {
    console.log('login');
    try {
        // find user by email
        const user = await User.findOne({email: req.body.email});
        if (!user) return res.status(400).send('Invalid email / password');
        // compare passwords
        const pwdCheck = await bcrypt.compare(req.body.password, user.pwd);
        if (!pwdCheck) return res.status(400).send('Invalid email / password');
        // gen web token
        const token = user.generateAuthToken();

        // only use this method to set cookies (cookie-parser)
        // cookies res.setHeader('Set-cookie', <one string contains all attriubtes seperated by ; > )
        // *** cookies will not show up in chrome dev tools using this method ***
        return res.status(200).setHeader('Set-Cookie', 'jwt=' + token + '; Path=/api').send();
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }

})








router.post('/changepassword', verifyToken, async (req, res) => {
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





router.post('/updateprofile', [verifyToken, upload.single('file')], async (req, res) => {
    console.log('updateprofile');
    try {
        // pwd check
        const user = await User.findOne({_id: req.tokenData._id}).select('pwd');
        if (!user) return res.status(400).send('Server Error');
        const pwdCheck = await bcrypt.compare(req.body.password, user.pwd);
        if (!pwdCheck) return res.status(400).send('Incorrect password');

        if (typeof req.file !== "undefined") {
            // valid file
            if (!validFileProperties(req.file.originalname, req.file.size)) { 
                try { fs.unlinkSync(req.file.path) }
                catch (err) { console.log(err) }
                return res.status(400).send('Image file must be a .png or .jpg under 8MB');
            }
            // save file
            let fileName = await saveUserImage(req.body.name, req.file.path);
            if (fileName === false) return res.status(500).send('Server Error');

            // append new img filename for doc
            req.body.profileImg = fileName;

            // query user data for old profileImg
            var oldUser = await User.findOne({_id: req.tokenData._id}).select('profileImg -_id');
        }

        req.body.email = req.body.email.trim();
        req.body.about = req.body.about.trim();
        req.body.name = req.body.name.trim();

        // validate
        if (req.body.name.length < 3) return res.status(400).send('Username must be at least 3 characters');
        if (req.body.about.length >= 500) return res.status(400).send('About section must be less than 500 characters');

        // send email to new user address
        // ****

        // update document 
        await User.findOneAndUpdate({ _id: req.tokenData._id }, req.body, { runValidators: true });

        // delete old img files (if req.files was uploaded)
        if (typeof req.file !== "undefined") {
            try {
                fs.unlinkSync("client/public/user_profile_img/card/" + oldUser.profileImg);
                fs.unlinkSync("client/public/user_profile_img/thumb/" + oldUser.profileImg);
                fs.unlinkSync("client/public/user_profile_img/original/" + oldUser.profileImg);
            } catch (e) { console.log(e) }
        }
    }
    catch (err) {
        console.log(err);
        try {
            fs.unlinkSync("client/public/user_profile_img/card/" + fileName);
            fs.unlinkSync("client/public/user_profile_img/thumb/" + fileName);
            fs.unlinkSync("client/public/user_profile_img/original/" + fileName);
        } catch (e) { console.log(e) }
    }

    // return updated user data
    var updatedUser = await User.findOne({_id: req.tokenData._id}, '-pwd -_id -admin -__v');
    return res.status(200).json(updatedUser);
})









router.get('/getmyuserdata', verifyToken, async (req, res) => {
    console.log('getmyuserdata');
    try {
        const user = await User.findOne({_id: req.tokenData._id}, '-pwd -_id -admin -__v');
        if (!user) return res.status(500).send('Server Error');
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).send('Server Error');
    }
})






router.post('/getuserdata', async (req, res) => {
    console.log('getuserdata');
    try {
        // decrytp authid
        var authid = decrypt(req.body.authid);
        if (!authid) return res.status(500).send();

        const user = await User.findOne({_id: authid}, '-pwd -_id -admin -email -__v');
        if (!user) return res.status(400).send();
        return res.status(200).json(user);
    }
    catch (error) {
        console.log(err);
        return res.status(500).send('Server Error');
    }
})

// router.post('/getcookprofile', async (req, res) => {
//     try {
//         const user = await User.findOne({_id: req.body.authid}).select('about name profileImg -_id');
//         res.status(200).json(user);
//     }
//     catch (err) {
//         return res.status(500).send();
//     }
// })













module.exports = router;


