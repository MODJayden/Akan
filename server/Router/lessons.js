const express = require('express');
const  { 
  generateLessons, 
  getLessons 
}= require('../controller/lesson');

const router = express.Router();

router.post('/generate', generateLessons);
router.get('/', getLessons);


module.exports = router;