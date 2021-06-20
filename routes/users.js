const { User } = require('../models/users');
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateEmail, validatePwd } = require('../serverFiles/validation');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');


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






module.exports = router;


