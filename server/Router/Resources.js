const express = require("express");
const router = express.Router();
const { generateResources, getResources } = require("../controller/Resources");

router.post("/resource/generate", generateResources);
router.get("/resource/get", getResources);

module.exports = router;