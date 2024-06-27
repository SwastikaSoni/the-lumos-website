const express = require('express')
const router = express.Router()

const Product = require('../models/ProductsSchema');
router.post('/products', (req, res) => {
    try {
        res.send(global.products)
    } catch (error) {
        res.send("server error")
    }
})


module.exports = router;