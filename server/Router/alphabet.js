
const express = require("express");
const { createAlphabet, getAllAlphabets, deleteAlphabet } = require("../controller/alphabet");

const router = express.Router();

router.post("/alphabet", createAlphabet);
router.get("/alphabet", getAllAlphabets);
router.delete("/alphabet/:id", deleteAlphabet);

module.exports = router;