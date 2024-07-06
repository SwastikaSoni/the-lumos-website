const express = require('express');
const router = express.Router();
const sendMail = require('../controller/SendMail')
router.post('/feedback', sendMail)
module.exports = router;