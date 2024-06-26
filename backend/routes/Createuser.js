const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.jwtSecret
require('dotenv').config();

require('dotenv').config();
router.post(
    "/createuser",
    [
        body('username')
            .trim()
            .notEmpty()
            .withMessage('Username is required')
            .escape()
            .custom(async (value) => {
                const existingUser = await User.findOne({ username: value });
                if (existingUser) {
                    throw new Error('A user already exists with this username');
                }
            }),
        body('email')
            .trim()
            .notEmpty()
            .withMessage('Email is required')
            .isEmail()
            .withMessage('Invalid email address')
            .normalizeEmail()
            .custom(async (value) => {
                const existingUser = await User.findOne({ email: value });
                if (existingUser) {
                    throw new Error('A user already exists with this email address');
                }
            }),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('Password is required')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long')
            .escape()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10)
        let secPassword = await bcrypt.hash(req.body.password, salt)
        try {
            await User.create({
                username: req.body.username,
                email: req.body.email,
                password: secPassword
            });
            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    }
);


router.post("/loginuser", [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username is required')
        .escape(),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .escape()], async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }
            let username = req.body.username;
            let password = req.body.password;
            try {
                let userData = await User.findOne({ username });
                if (!userData) {
                    return res.status(400).json({ errors: "Try logging with correct credentials" })
                }
                const isMatch = await bcrypt.compare(password, userData.password);
                if (!isMatch) {
                    return res.status(400).json({ errors: "Try logging with correct credentials" });
                }
                const data = {
                    user: {
                        id: userData.id
                    }
                }
                const authToken = jwt.sign(data, jwtSecret)
                res.json({ success: true, authToken: authToken });
            }
            catch (error) {
                console.log(error)
                res.json({ success: false });
            }
        });
module.exports = router;