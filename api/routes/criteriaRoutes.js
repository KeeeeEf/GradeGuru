// routes/semesterRoutes.js

const express = require('express');
const router = express.Router();
const { addCriteria, getCriteria, editCriteria, deleteCriteria } = require('../controller/criteriaController');

router.post('/addcriteria', addCriteria);
router.get('/getcriteria', getCriteria);
router.post('/editcriteria', editCriteria)
router.delete('/editcriteria', deleteCriteria)

module.exports = router;
