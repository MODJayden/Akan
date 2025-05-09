const express = require('express');
const { upload, handleUploadAudio } = require('../Helpers/cloudinary-helper');

const router = express.Router();

// Upload route
router.post('/upload', upload.single('audio'), handleUploadAudio);



module.exports = router;