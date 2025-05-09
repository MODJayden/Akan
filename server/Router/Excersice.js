const express = require("express");
const {
  createVocabs,
  createSentence,
  createFillInTheBlank,
  getVocabs,
  getSentences,
  getFillInTheBlank,
} = require("../controller/Excercise");
const router = express.Router();

router.post("/createVocabs", createVocabs);
router.post("/createSentence", createSentence);
router.post("/createFillInTheBlank", createFillInTheBlank);

router.get("/getVocabs", getVocabs);
router.get("/getSentences", getSentences);
router.get("/getFillInTheBlank", getFillInTheBlank);

module.exports = router;
