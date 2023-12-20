// routes/semesterRoutes.js

const express = require('express');
const router = express.Router();
const { addSemester, getSemester, deleteSemester } = require('../controller/semesterController');

router.post('/addsemester', addSemester);
router.get('/getsemester', getSemester);
router.delete('/deletesemester/:semesterId', deleteSemester);

module.exports = router;
