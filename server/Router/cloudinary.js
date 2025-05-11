const express = require("express");
const { upload, handleUploadAudio } = require("../Helpers/cloudinary-helper");

const { uploadFile, handleUploadFile } = require("../Helpers/culture-helper");

const router = express.Router();

// Upload route
router.post("/upload", upload.single("audio"), handleUploadAudio);

router.post("/uploadFile", uploadFile.single("file"), handleUploadFile);

module.exports = router;
