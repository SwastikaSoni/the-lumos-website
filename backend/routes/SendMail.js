const express = require('express');
const router = express.Router();
const sendMail = require('../controller/SendMail')
const sendFeedback = require('../controller/SendFeedback')
router.post('/feedback', sendMail)
router.post('/sendfeedback', sendFeedback)
module.exports = router;