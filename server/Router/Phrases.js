
const express = require("express");
const { createPhrases, getAllPhrasess, deletePhrases } = require("../controller/Phrases");
const router = express.Router();

router.post("/create", createPhrases);
router.get("/all", getAllPhrasess);
router.delete("/delete/:id", deletePhrases);

module.exports = router;