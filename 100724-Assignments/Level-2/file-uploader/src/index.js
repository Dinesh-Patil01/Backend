const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs = require('fs');

// Cloudinary configuration
cloudinary.config({
    cloud_name: 'your_cloud_name',
    api_key: 'your_api_key',
    api_secret: 'your_api_secret'
});

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

const app = express();
const PORT = process.env.PORT || 3000;

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const filePath = req.file.path;

    // Upload the file to Cloudinary
    cloudinary.uploader.upload(filePath, (error, result) => {
        if (error) {
            return res.status(500).send('Upload to Cloudinary failed.');
        }

        // Delete the local file after upload
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Failed to delete local file:', err);
            }
        });

        res.status(200).json({
            message: 'File uploaded successfully',
            imageUrl: result.secure_url
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
