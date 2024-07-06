const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const Order = require('../models/Orders')



router.post('/products', (req, res) => {
    try {
        res.send(global.products)
    } catch (error) {
        res.send("server error")
    }
})


router.post('/displayProfile', async (req, res) => {
    try {
        let eId = await User.findOne({ 'username': req.body.username })
        if (!eId) {
            return res.status(404).json({ error: 'No user found' });
        }
        res.json(eId);
    } catch (error) {
        console.error('Error fetching order data:', error);
        res.status(500).json({ error: error.message });
    }
});


router.put('/changePassword', async (req, res) => {
    try {
        const { username, newPassword } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.json({ error: 'User not found.' });
        }
        const isMatch = await bcrypt.compare(newPassword, user.password);
        if (isMatch) {
            return res.json({ error: 'Type new password. Password already in use' });
        }
        if (!isMatch) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            user.password = hashedPassword;
            await user.save();
            res.json({ message: 'Password updated successfully.' });
        }


    } catch (error) {
        console.error('Error updating password:', error);
        res.json({ error: 'Server error. Please try again.' });
    }
});

router.delete('/deleteAccount', async (req, res) => {
    try {
        const { username } = req.body;
        const user = await User.findOneAndDelete({ username });
        const order = await Order.findOneAndDelete({ username });

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.json({ message: 'User account deleted successfully.' });
    } catch (error) {
        console.error('Error deleting user account:', error);
        res.status(500).json({ error: 'Server error. Please try again.' });
    }
});
module.exports = router;