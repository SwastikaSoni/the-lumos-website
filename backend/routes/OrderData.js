const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0, 0, { Order_date: req.body.order_date })

    let eId = await Order.findOne({ 'username': req.body.username })
    if (eId === null) {
        try {
            await Order.create({
                username: req.body.username,
                order_data: [data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }

    else {
        try {
            await Order.findOneAndUpdate({ username: req.body.username },
                { $push: { order_data: data } }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})


router.post('/myOrderData', async (req, res) => {
    try {
        let myData = await Order.findOne({ 'username': req.body.username })
        if (!myData || !myData.order_data || myData.order_data.length === 0) {
            return res.status(404).json({ error: 'No orders found for this user' });
        }
        const orderData = myData.order_data;
        res.json({ orderData })
    } catch (error) {
        console.error('Error fetching order data:', error);
        res.status(500).json({ error: error.message });
    }
});


router.delete('/clearHistory', async (req, res) => {
    try {
        const { username } = req.body;
        const order = await Order.findOneAndDelete({ username });
        res.json({ message: 'Deleted successfully.' });
    } catch (error) {
        console.error('Error deleting:', error);
        res.status(500).json({ error: 'Server error. Please try again.' });
    }
});
module.exports = router;
