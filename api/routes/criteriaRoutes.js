// routes/semesterRoutes.js

const express = require('express');
const router = express.Router();
const { addCriteria, getCriteria } = require('../controller/criteriaController');

router.post('/addcriteria', addCriteria);
router.get('/getcriteria', getCriteria);

module.exports = router;
