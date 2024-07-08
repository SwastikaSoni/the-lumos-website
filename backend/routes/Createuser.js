const express = require('express')
const router = express.Router()
const Mailgen = require('mailgen')
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require('dotenv').config();
var nodemailer = require("nodemailer");
const jwtSecret = process.env.jwtSecret
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
            res.json({ success: false, message: "Server error" });
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
                const authToken = jwt.sign(data, jwtSecret, { expiresIn: '24h' })
                res.json({ success: true, authToken: authToken });
            }
            catch (error) {
                console.log(error)
                res.json({ success: false, message: "Server error" });
            }
        });
router.post("/forgot-password", async (req, res) => {
    const { username } = req.body;
    try {
        const oldUser = await User.findOne({ username });
        if (!oldUser) {
            return res.status(404).json({ error: "User not found" });
        }
        const userEmail = oldUser.email;
        const secret = jwtSecret + oldUser.password;
        const token = jwt.sign({ email: userEmail, id: oldUser._id }, secret, {
            expiresIn: "5m",
        });
        let config = {
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        }
        const link = `http://localhost:5000/api/reset-password/${oldUser._id}/${token}`;
        let transporter = nodemailer.createTransport(config);
        let MailGenerator = new Mailgen({
            theme: 'default',
            product: {
                name: 'Mailgen',
                link: 'https://mailgen.js/'
            }
        })
        let response = {
            body: {
                intro: link
            }
        };
        let mail = MailGenerator.generate(response)
        let message = {
            from: process.env.EMAIL,
            to: userEmail,
            subject: "Reset Link",
            html: mail
        }

        transporter.sendMail(message, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return res.status(500).json({ error: "Failed to send reset link" });
            }
            return res.status(201).json({ msg: "Reset Link sent" });
        });
    } catch (error) {
        console.error("Error in forgot password request:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
        return res.json({ status: "User Not Exists!!" });
    }
    const secret = jwtSecret + oldUser.password;
    try {
        const verify = jwt.verify(token, secret);
        res.render("index", { email: verify.email, status: "Not Verified", id, token });
    } catch (error) {
        console.log(error);
        res.send("Not Verified");
    }
});

router.post("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    const { password, 'confirm-password': confirmPassword } = req.body;
    if (!password) {
        return res.json({ status: "Password is required" });
    }

    if (password !== confirmPassword) {
        return res.json({ status: "Passwords do not match" });
    }
    if (password.length < 8) {
        return res.json({ status: "Password must be at least 8 characters long" });
    }
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
        return res.json({ status: "User Not Exists!!" });
    }
    const secret = jwtSecret + oldUser.password;
    try {
        const verify = jwt.verify(token, secret);
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        await User.updateOne(
            { _id: id },
            { $set: { password: encryptedPassword } }
        );

        res.render("reset-success", { email: verify.email });
    } catch (error) {
        console.log(error);
        res.json({ status: "Something Went Wrong" });
    }
});

module.exports = router;