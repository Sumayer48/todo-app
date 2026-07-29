const express = require('express');
const router = express.Router();

const upload = require('../middleware/uploadMiddleware');
const { uploadImages } = require('../controllers/uploadController');


router.post('/upload', upload.array('image', 5), uploadImages);
//router.delete('/delete/:filename', deleteImage);

module.exports = router;