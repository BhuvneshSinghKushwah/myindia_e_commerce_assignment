require('dotenv').config();

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const {emailValidation, passwordValidation, generateUserId} = require('../utils');
const {authenticationMiddleware} = require('../middlewares/authentication');
const {adminAuthorizationMiddleware, superAdminAuthorizationMiddleware} = require('../middlewares/authorization');
const User = require('../../mongodb/userSchema');

const create_user = async (req, res) => {
    try {
        let { email, password, full_name } = req.body;
        if(!email || typeof email != "string" || !password || typeof password != "string"|| !full_name || typeof full_name != "string") return res.status(400).json({status: false, message: "please provide all details"});
        
        let emailValid = emailValidation(email);
        if(!emailValid.status) return res.status(401).json(emailValid);

        let passwordValid = passwordValidation(password);
        if(!passwordValid.status) return res.status(401).json(passwordValid);

        let generate_user_id = generateUserId(6);
        if(!generate_user_id.status) return res.status(500).json(generate_user_id);

        const user_id = generate_user_id.user_id;
        const newUser = new User({
            user_id,
            full_name, 
            email,
            password
        })

        await newUser.save();

        const token = jwt.sign({user_id}, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({status: true, message: "User Successfully Created", token: token})
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({status: false, message: "Something Went Wrong!!"});        
    }
}
router.get('/details', authenticationMiddleware, superAdminAuthorizationMiddleware, async (req, res) => {
    try {
        return res.status(200).json({status: true, details: []});
    } catch (err) {
        
    }
})

router.post('/update/details', authenticationMiddleware, superAdminAuthorizationMiddleware,async (req, res) => {
    try {
        
    } catch (err) {
        
    }
})

// Admin creates user (AUTHORIZATION)
router.post('/create', authenticationMiddleware, superAdminAuthorizationMiddleware, create_user);

// User Signup (NO AUTHORIZATION)
router.post('/signup', create_user);
    

// Login
router.get('/login', async (req, res) => {
    try {
        let { Email, Password } = req.body;
        if(!Email || typeof Email != String || !Password || typeof Password != String) return res.status(400).json({status: false, message: "Invalid Email/Password"});
        
        let emailValid = emailValidation(Email);
        if(!emailValid.status) return res.status(401).json(emailValid);

        let passwordValid = passwordValidation(Password);
        if(!passwordValid.status) return res.status(401).json(passwordValid);



        return res.status(200).json({status: true, message: "User Successfully Created", token: 'Token'})
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({status: false, message: "Something Went Wrong!!"});        
    }
})

router.delete('/delete', authenticationMiddleware, superAdminAuthorizationMiddleware, async (req, res) => {
    try {
        
    } catch (err) {
        
    }
})

module.exports = router;