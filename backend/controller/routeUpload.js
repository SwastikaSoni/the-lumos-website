const express = require('express');
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../middleware/multer");

router.post('/upload', upload.single('image'), function (req, res) {
    console.log('File received:', req.file); // Log the received file for debugging

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No file uploaded"
        });
    }

    cloudinary.uploader.upload(req.file.path, function (err, result) {
        if (err) {
            console.log('Cloudinary upload error:', err);
            return res.status(500).json({
                success: false,
                message: "Cloudinary upload error",
                error: err
            });
        }

        res.status(200).json({
            success: true,
            message: "Uploaded!",
            data: result
        });
    });
});

module.exports = router;
